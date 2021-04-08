import WSAvcPlayer from 'h264-live-player';

import { constants, env } from 'fuku.tv-shared';
import { EnhancedStore } from '@reduxjs/toolkit';
import { useGameState } from 'src/state/hooks';

// const { state, actions } = useGameState();

/**
 * URL for fuku.tv controller
 */
const FUKU_URL_CONTROLLER = env.fukuControllerServerURL();

/**
 * URL for fuku.tv video
 */
const FUKU_URL_VIDEO = env.fukuVideoServerURL();

/**
 * Base class for all
 */
class Fuku {
  liveplayer: WSAvcPlayer;

  socket: WebSocket;

  timerCommand: NodeJS.Timeout;

  intervalStandby: NodeJS.Timeout;

  intervalPlay: NodeJS.Timeout;

  currentVideoUri: typeof constants.Video.front | typeof constants.Video.side = constants.Video.front;

  queue: number;

  watch: number;

  credits: number;

  freeplay: number;

  // TODO remove UGLY UGLY UGLY hack
  uglyHackStore: EnhancedStore;

  start(): void {
    if (this.uglyHackStore === null || this.uglyHackStore === undefined) {
      throw new Error('Fuku store not found, did you forget to run bootstrapStore?');
    } else {
      this.connect(FUKU_URL_CONTROLLER);
    }
  }

  end(): void {
    this.disconnect();
  }

  /**
   * scaffolds video stream to canvas
   */
  bootstrapVideo(canvasRef: HTMLElement): void {
    const canvas = canvasRef;

    this.liveplayer = new WSAvcPlayer(canvas, 'webgl');
    this.liveplayer.connect(FUKU_URL_VIDEO);
    this.liveplayer.initCanvas(800, 480);

    console.log('starting video');
  }

  disconnectVideo(): void {
    console.log('unmount video');
    this.liveplayer.running = false;
    this.liveplayer.disconnect();
  }

  /**
   * scaffolds video stream to canvas
   */
  bootstrapStore(store: EnhancedStore): void {
    this.uglyHackStore = store;
  }

  /**
   * Sends start command for Fuku button
   * @param type control command to send to the websocket
   */
  buttonStartEvent = (type: string): void => {
    // switch statement for type because command objects arent consistent.
    const { PlayerCommand, Video } = constants;

    console.log('sent command: ', type);
    switch (type) {
      // user joins queue
      case PlayerCommand.queue:
        this.send({ command: PlayerCommand.queue });
        break;
      // case PlayerCommand.login:
      //   this.send({ command: PlayerCommand.login, message: this.uglyHackStore.getState().auth.accessToken });
      //   break;

      // case PlayerCommand.logout:
      //   this.send({ command: PlayerCommand.logout });
      //   break;
      // swap video
      case 'swapvideo':
        this.currentVideoUri = this.currentVideoUri === Video.front ? Video.side : Video.front;
        this.liveplayer.sendMessage(
          JSON.stringify({
            command: constants.PlayerCommand.swapvideo,
            video: this.currentVideoUri,
          })
        );
        break;

      // all other messages
      default:
        this.send({
          command: constants.PlayerCommand.control,
          button: type,
          action: constants.Action.start,
        });
        break;
    }
  };

  /**
   * Sends stop command for Fuku button
   * @param type control command to send to the websocket
   */
  buttonEndEvent = (type: string): void => {
    this.send({
      command: constants.PlayerCommand.control,
      button: type,
      action: constants.Action.stop,
    });
  };

  /**
   * Login to fuku websocket
   */
  login = (token: string): void => {
    this.send({ command: constants.PlayerCommand.login, message: token });
  };

  /**
   * Logout of fuku websocket
   */
  logout = (): void => {
    this.send({ command: constants.PlayerCommand.logout });
  };

  private disconnect(): void {
    if (this.socket === null || this.socket === undefined) return;
    this.socket.close();
    this.socket = null;
  }

  private connect(controllerUri: string): void {
    if (this.socket !== null || this.socket !== undefined) this.disconnect();
    // pass opaque token to controller websocket
    this.socket = new WebSocket(controllerUri);
    this.socket.binaryType = 'arraybuffer';

    this.socket.onopen = () => {
      console.log('Socket Connected');
    };
    this.socket.onmessage = (e) => {
      this.parseCommand(JSON.parse(e.data));
    };
    this.socket.onclose = (ev) => {
      console.log('Socket Closed:', ev);
      this.disconnect();
    };
    this.socket.onerror = (ev) => {
      console.log('Socket Error:', ev);
      this.disconnect();
    };
  }

  private parseCommand(cmd) {
    const { PlayerCommand, Video } = constants;
    console.log(`Got command: ${cmd.command}`);
    switch (cmd.command) {
      case PlayerCommand.init:
        this.resetTimers();
        this.setGameStatus(cmd.command);
        break;

      case PlayerCommand.gamestats:
        this.queue = cmd.queue;
        this.watch = cmd.watch;
        this.credits = cmd.credits;
        this.freeplay = cmd.freeplay;
        this.uglyHackStore.dispatch({
          type: 'GAME/gamestats',
          payload: {
            queue: this.queue,
            watch: this.watch,
            credits: this.credits,
            freeplay: this.freeplay,
          },
        });
        break;
      case PlayerCommand.gamestandby:
        this.resetTimers();
        this.uglyHackStore.dispatch({
          type: 'GAME/setTime',
          payload: {
            timer: 30,
          },
        });
        this.setGameStatus(cmd.command);
        break;
      case PlayerCommand.gameplay:
        this.resetTimers();
        this.setTimerBar(30);
        this.setGameStatus(cmd.command);
        break;
      case PlayerCommand.prizeget:
        console.log('WINNERR', cmd.points);
        this.setPoints(cmd.points);
        if (cmd.jackpot === true) {
          console.log('JACKPOT WINNER');
          // this.toggleJackpotModal();
        } else {
          this.toggleWinnerModal();
        }
        // actions.toggleWinnerModal();
        // useGameState().actions.toggleWinnerModal();
        break;
      case PlayerCommand.gameplayend:
        this.resetTimers();
        this.timerCommand = setTimeout(() => {}, 6000);

        this.setGameStatus(cmd.command);
        break;
      case PlayerCommand.gameend:
        this.resetTimers();
        this.setGameStatus(cmd.command);
        break;

      case PlayerCommand.queue:
        this.uglyHackStore.dispatch({
          type: 'GAME/queueStatus',
          payload: true,
        });
        break;

      case PlayerCommand.dequeue:
        this.uglyHackStore.dispatch({
          type: 'GAME/queueStatus',
          payload: false,
        });
        break;

      case PlayerCommand.chatmsg:
        // this.updateChatModal(cmd.nickname, cmd.chatmessage);
        break;

      default:
        console.log('Unknown command');
        console.log(cmd);
        break;
    }
  }

  private setGameStatus(status) {
    this.uglyHackStore.dispatch({
      type: 'GAME/setGameStatus',
      payload: {
        gameStatus: status,
      },
    });
  }

  private setPoints(p) {
    this.uglyHackStore.dispatch({
      type: 'GAME/setPoints',
      payload: {
        points: p,
      },
    });
  }

  private toggleWinnerModal() {
    this.uglyHackStore.dispatch({
      type: 'GAME/toggleWinnerModal',
    });
  }

  private resetTimers(): void {
    if (this.timerCommand !== null) clearTimeout(this.timerCommand);
    if (this.intervalStandby !== null) clearInterval(this.intervalStandby);
    if (this.intervalPlay !== null) clearInterval(this.intervalPlay);
  }

  private setTimerBar(timeValue: number): void {
    let timerValue = timeValue;
    this.intervalStandby = setInterval(() => {
      timerValue -= 1;
      if (timerValue < 0) clearInterval(this.intervalStandby);
      else
        this.uglyHackStore.dispatch({
          type: 'GAME/setTime',
          payload: {
            timer: timerValue,
          },
        });
    }, 1000);
  }

  private send(data: any) {
    if (this.socket === null || this.socket === undefined) {
      console.log('socket null');
      return;
    }

    this.socket.send(JSON.stringify(data));
  }
}

export default Fuku;
