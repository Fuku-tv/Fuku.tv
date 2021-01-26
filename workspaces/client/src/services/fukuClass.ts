import WSAvcPlayer from 'h264-live-player';

import { constants } from 'fuku.tv-shared';
import { EnhancedStore } from '@reduxjs/toolkit';

/**
 * URL for fuku.tv controller
 */
const FUKU_URL_CONTROLLER = 'wss://alpha.fuku.tv:10888';

/**
 * URL for fuku.tv video
 */
const FUKU_URL_VIDEO = 'wss://alpha.fuku.tv:10889';

class Fuku {
  liveplayer: WSAvcPlayer;

  waitforkeyframe: boolean;

  socket: WebSocket;

  timerCommand: NodeJS.Timeout;

  intervalStandby: NodeJS.Timeout;

  intervalPlay: NodeJS.Timeout;

  intervalConnection: NodeJS.Timeout;

  currentVideoUri: typeof constants.Video.front | typeof constants.Video.side;

  queue: number;

  watch: number;

  credits: number;

  // TODO remove UGLY UGLY UGLY hack
  uglyHackStore: EnhancedStore;

  constructor() {
    console.log('new fuku');

    this.currentVideoUri = constants.Video.front;

    /**
     * juryrig reconnect logic in case socket disconnects
     */
    this.intervalConnection = setInterval(() => {
      if (this.socket !== null && this.socket !== undefined) return;
      this.connect(FUKU_URL_CONTROLLER, FUKU_URL_VIDEO);
    }, 250);
  }

  /**
   * connect to websocket after camera and button components are bootstraped
   * @returns WebSocket, use this to subscribe to onMessage events
   */
  connectSocket(): WebSocket {
    this.connect(FUKU_URL_CONTROLLER, FUKU_URL_VIDEO);
    return this.socket;
  }

  /**
   * scaffolds video stream to canvas
   */
  bootstrapVideo(canvasRef: HTMLElement): void {
    const canvas = canvasRef;

    // WSAvcPlayer is loaded globally from "/js/liveplayer-min.js"
    this.liveplayer = new WSAvcPlayer(canvas, 'webgl');
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
      case 'join':
        this.send({ command: constants.PlayerCommand.queue, action: 'join' });
        break;

      case 'swapvideo':
        this.currentVideoUri = this.currentVideoUri === constants.Video.front ? constants.Video.side : constants.Video.front;
        this.liveplayer.sendMessage(
          JSON.stringify({
            command: constants.PlayerCommand.swapvideo,
            video: this.currentVideoUri,
          })
        );
        break;

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
    delete this.socket;
  }

  private connect(controllerUri, videoUri): void {
    if (this.socket !== null || this.socket !== undefined) this.disconnect();
    this.socket = new WebSocket(controllerUri);
    this.socket.binaryType = 'arraybuffer';
    this.socket.onopen = () => {
      console.log('Socket Connected');
      this.liveplayer.connect(videoUri);
    };
    this.socket.onmessage = (e) => {
      if (typeof e.data === 'string') {
        this.parseCommand(JSON.parse(e.data));
      } else {
        if (this.waitforkeyframe && e.data[4] === 104) this.waitforkeyframe = false;
        if (!this.waitforkeyframe) this.liveplayer.decode(e.data);
      }
    };
    this.socket.onclose = () => {
      console.log('Socket Closed');
      this.liveplayer.running = false;
      this.disconnect();
    };
    this.socket.onerror = () => {
      console.log('Socket Error');
      this.liveplayer.running = false;
      this.disconnect();
    };
  }

  private parseCommand(cmd) {
    const { PlayerCommand, Video } = constants;
    console.log(`Got command: ${cmd.command}`);
    switch (cmd.command) {
      case PlayerCommand.init:
        this.liveplayer.initCanvas(cmd.width, cmd.height);
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
    const dataWithToken = {
      ...data,
      token: this.uglyHackStore.getState().auth.accessToken,
    };

    console.log(dataWithToken);
    this.socket.send(JSON.stringify(dataWithToken));
  }
}

export default Fuku;
