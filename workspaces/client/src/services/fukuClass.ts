import WSAvcPlayer from 'h264-live-player';

import { constants, env } from 'fuku.tv-shared';
import { EnhancedStore } from '@reduxjs/toolkit';

/**
 * URL for fuku.tv controller
 */
const FUKU_URL_CONTROLLER = env.FukuControllerServerURL();

/**
 * URL for fuku.tv video
 */
const FUKU_URL_VIDEO = env.FukuVideoServerURL();

class Fuku {
  liveplayer: WSAvcPlayer;

  waitforkeyframe: boolean;

  socket: WebSocket;

  timerCommand: NodeJS.Timeout;

  intervalStandby: NodeJS.Timeout;

  intervalPlay: NodeJS.Timeout;

  currentVideoUri: typeof constants.Video.front | typeof constants.Video.side;

  queue: number;

  watch: number;

  credits: number;

  // TODO remove UGLY UGLY UGLY hack
  uglyHackStore: EnhancedStore;

  constructor() {
    console.log('new fuku');

    this.currentVideoUri = constants.Video.front;
  }

  start(): void {
    if (this.uglyHackStore === null || this.uglyHackStore === undefined) {
      throw new Error('Fuku store not found, did you forget to run bootstrapStore?');
    } else if (this.uglyHackStore.getState().auth.accessToken === '') {
      throw new Error('Cannot connect to socket with valid Login token, are you currently logged in?');
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

    switch (type) {
      // user joins
      case 'join':
        this.send({ command: constants.PlayerCommand.queue, action: 'join' });
        break;

      // swap video
      case 'swapvideo':
        this.currentVideoUri = this.currentVideoUri === constants.Video.front ? constants.Video.side : constants.Video.front;
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

  private disconnect(): void {
    if (this.socket === null || this.socket === undefined) return;
    this.socket.close();
    this.socket = null;
  }

  private connect(controllerUri: string): void {
    if (this.socket !== null || this.socket !== undefined) this.disconnect();
    // pass opaque token to controller websocket
    this.socket = new WebSocket(`${controllerUri}?token=${this.uglyHackStore.getState().auth.accessToken}`);
    this.socket.binaryType = 'arraybuffer';

    this.socket.onopen = () => {
      console.log('Socket Connected');
    };
    this.socket.onmessage = (e) => {
      // if (typeof e.data === 'string') {
      //   this.parseCommand(JSON.parse(e.data));
      // } else {
      //   if (this.waitforkeyframe && e.data[4] === 104) this.waitforkeyframe = false;
      //   if (!this.waitforkeyframe) this.liveplayer.decode(e.data);
      // }
      this.parseCommand(JSON.parse(e.data));
    };
    this.socket.onclose = () => {
      console.log('Socket Closed');
      this.disconnect();
    };
    this.socket.onerror = () => {
      console.log('Socket Error');
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
        this.uglyHackStore.dispatch({
          type: 'GAME/gamestats',
          payload: {
            queue: this.queue,
            watch: this.watch,
            credits: this.credits,
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
      case PlayerCommand.gameplayend:
        this.resetTimers();
        this.timerCommand = setTimeout(() => {}, 6000);

        this.setGameStatus(cmd.command);
        break;
      case PlayerCommand.gameend:
        this.resetTimers();
        this.setGameStatus(cmd.command);
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

  private resetTimers(): void {
    if (this.timerCommand !== null) clearTimeout(this.timerCommand);
    if (this.intervalStandby !== null) clearInterval(this.intervalStandby);
    if (this.intervalPlay !== null) clearInterval(this.intervalPlay);
  }

  private setTimerBar(timeValue): void {
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

  private send(data) {
    if (this.socket === null || this.socket === undefined) {
      console.log('socket null');
      return;
    }

    this.socket.send(JSON.stringify(data));
  }
}

export default Fuku;
