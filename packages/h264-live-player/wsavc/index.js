const Class = require('uclass');
const Events = require('uclass/events');
const debug = require('debug');
const Avc = require('../broadway/Decoder');
const YUVWebGLCanvas = require('../canvas/YUVWebGLCanvas');
const YUVCanvas = require('../canvas/YUVCanvas');
const Size = require('../utils/Size');

const log = debug('wsavc');

const WSAvcPlayer = new Class({
  Implements: [Events],

  initialize(canvas, canvastype) {
    this.canvas = canvas;
    this.canvastype = canvastype;

    // AVC codec initialization
    this.avc = new Avc();

    // WebSocket variable
    this.ws;
    this.pktnum = 0;
  },

  decode(data) {
    let naltype = 'invalid frame';

    if (data.length > 4) {
      if (data[4] == 0x65) {
        naltype = 'I frame';
      } else if (data[4] == 0x41) {
        naltype = 'P frame';
      } else if (data[4] == 0x67) {
        naltype = 'SPS';
      } else if (data[4] == 0x68) {
        naltype = 'PPS';
      }
    }
    // log("Passed " + naltype + " to decoder");
    this.avc.decode(data);
  },

  connect(url) {
    // Websocket initialization
    if (this.ws != undefined) {
      this.ws.close();
      delete this.ws;
    }
    this.ws = new WebSocket(url);
    this.ws.binaryType = 'arraybuffer';

    this.ws.onopen = () => {
      log(`Connected to ${url}`);
    };

    let framesList = [];

    this.ws.onmessage = (evt) => {
      if (typeof evt.data === 'string') return this.cmd(JSON.parse(evt.data));

      this.pktnum++;
      const frame = new Uint8Array(evt.data);
      // log("[Pkt " + this.pktnum + " (" + evt.data.byteLength + " bytes)]");
      // this.decode(frame);
      framesList.push(frame);
    };

    let running = true;

    var shiftFrame = function () {
      if (!running) return;

      if (framesList.length > 10) {
        log('Dropping frames', framesList.length);
        framesList = [];
      }

      const frame = framesList.shift();

      if (frame) this.decode(frame);

      requestAnimationFrame(shiftFrame);
    }.bind(this);

    shiftFrame();

    this.ws.onclose = () => {
      running = false;
      log('WSAvcPlayer: Connection closed');
    };
  },

  initCanvas(width, height) {
    const canvasFactory = this.canvastype == 'webgl' || this.canvastype == 'YUVWebGLCanvas' ? YUVWebGLCanvas : YUVCanvas;

    const canvas = new canvasFactory(this.canvas, new Size(width, height));
    this.avc.onPictureDecoded = canvas.decode;
    this.emit('canvasReady', width, height);
  },

  cmd(cmd) {
    log('Incoming request', cmd);

    if (cmd.action == 'init') {
      this.initCanvas(cmd.width, cmd.height);
      this.canvas.width = cmd.width;
      this.canvas.height = cmd.height;
    }
  },

  sendMessage(message) {
    this.ws.send(message);
  },

  disconnect() {
    this.ws.close();
  },

  playStream() {
    const message = 'REQUESTSTREAM ';
    this.ws.send(message);
    log(`Sent ${message}`);
  },

  stopStream() {
    this.ws.send('STOPSTREAM');
    log('Sent STOPSTREAM');
  },
});

module.exports = WSAvcPlayer;
module.exports.debug = debug;
