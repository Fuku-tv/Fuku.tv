import WSAvcPlayer from 'h264-live-player';

import { constants, env } from 'fuku.tv-shared';
import type { EnhancedStore } from '@reduxjs/toolkit';
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
    // this.getAllChatMessages();
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

    switch (type) {
      case PlayerCommand.swapvideo:
        this.currentVideoUri = this.currentVideoUri === Video.front ? Video.side : Video.front;
        this.liveplayer.sendMessage(
          JSON.stringify({
            command: constants.PlayerCommand.swapvideo,
            video: this.currentVideoUri,
          })
        );

        this.toggleCameraDirection();

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

  enterQueue = (): void => {
    this.send({ command: constants.PlayerCommand.queue });
  };

  sendChatMessage = (message: Record<string, unknown>): void => {
    console.log('mess', message);
    this.send({
      command: constants.PlayerCommand.chatmsg,
      chatmessage: message,
    });
  };

  // setCurrentlyPlaying = (message: Record<string, unknown>): void => {
  //   console.log('mess', message);
  //   this.send({
  //     command: constants.PlayerCommand.chatmsg,
  //     chatmessage: message,
  //   });
  // };
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
    console.log('invoked disconnect command from client');
    if (this.socket === null || this.socket === undefined) return;
    console.log('disconnect()');
    this.socket.close();
    this.socket = null;
  }

  private connect(controllerUri: string): void {
    console.log('trying to connect to socket.');
    if (this.socket !== null || this.socket !== undefined) this.disconnect();
    // pass opaque token to controller websocket
    this.socket = new WebSocket(controllerUri);
    this.socket.binaryType = 'arraybuffer';

    this.socket.onopen = () => {
      console.log('Socket Connected');
      // this.getAllChatMessages();
    };
    this.socket.onmessage = (e) => {
      console.log('Message received', e.data);
      this.parseCommand(JSON.parse(e.data));
      // this.parseCommand({
      //   command: constants.PlayerCommand.chatmsg,
      //   chatmessage: this.chat,
      // });
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

  /**
   *
   * @param cmd parse incoming websocket command
   */
  private parseCommand(cmd: any) {
    const { PlayerCommand, Video, GameState } = constants;
    console.log(`Got command: ${cmd.command}`);
    switch (cmd.command) {
      case PlayerCommand.init:
        this.resetTimers();
        this.setGameStatus(cmd.command);
        this.setGameStats(cmd);
        break;
      case PlayerCommand.gamestats:
        this.setGameStats(cmd);
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
        console.log('WINNER', cmd.pointswon);
        this.setPoints(cmd.points);
        if (cmd.jackpot === true) {
          console.log('JACKPOT WINNER');
        } else {
          this.toggleWinnerModal(cmd.pointswon);
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
        console.log('Receving message from socket', cmd);
        this.updateChat(cmd.user, cmd.chatmessage);
        break;
      case GameState.playing:
        this.uglyHackStore.dispatch({
          type: 'GAME/setCurrentlyPlaying',
          payload: cmd.player,
        });
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

  private setGameStats(stats) {
    this.uglyHackStore.dispatch({
      type: 'GAME/gamestats',
      payload: {
        queue: stats.queue,
        watch: stats.watch,
        credits: stats.credits,
        points: stats.points,
        freeplay: stats.freeplay || 0,
      },
    });
  }

  private updateChat(user, message) {
    const chatMessage = { user, message };
    this.uglyHackStore.dispatch({
      type: 'GAME/sendChatMessage',
      payload: chatMessage,
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

  private toggleWinnerModal(points: number) {
    this.uglyHackStore.dispatch({
      type: 'GAME/toggleWinnerModal',
      payload: {
        pointsWon: points,
      },
    });
  }

  private toggleCameraDirection() {
    this.uglyHackStore.dispatch({
      type: 'GAME/toggleCameraDirection',
    });
  }

  // private setCurrentlyPlaying() {
  //   this.uglyHackStore.dispatch({
  //     type: 'GAME/setCurrentlyPlaying',
  //   });
  // }

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
    console.log(`sent command: ${JSON.stringify(data)}`);
    this.socket.send(JSON.stringify(data));
  }
}

export default Fuku;
