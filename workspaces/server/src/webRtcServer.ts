import webrtc from 'wrtc';
import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { LoggerClass } from 'fuku.tv-shared';

let senderStream;

const app = express();

const logger = new LoggerClass('WebRTCServer');

const config = {
  sdpSemantics: 'unified-plan',
  portRange: {
    min: 10000,
    max: 20000,
  },
  iceServers: [
    {
      urls: 'turn:openrelay.metered.ca:80',
      username: 'openrelayproject',
      credential: 'openrelayproject',
    },
    {
      urls: 'turn:openrelay.metered.ca:443',
      username: 'openrelayproject',
      credential: 'openrelayproject',
    },
  ],
};

// parse body to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// enable cors
app.use(cors());

app.post('/consumer', async ({ body }, res) => {
  const peer = new webrtc.RTCPeerConnection(config);
  const desc = new webrtc.RTCSessionDescription(body.sdp);
  await peer.setRemoteDescription(desc);
  if (!senderStream) {
    logger.logError('senderStream is not defined');
    res.send('error, no sender stream present');
    res.end();
    return;
  }
  senderStream.getTracks().forEach((track) => peer.addTrack(track, senderStream));
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  const payload = {
    sdp: peer.localDescription,
  };
  logger.logInfo(`peer connected to broadcast ${senderStream?.id}`);
  res.json(payload);
});

app.post('/broadcast', async ({ body }, res) => {
  const peer = new webrtc.RTCPeerConnection(config);
  peer.ontrack = (e) => {
    const [stream] = e.streams;
    senderStream = stream;
    logger.logInfo(`added stream track ${stream.id} from broadcaster`);
  };
  const desc = new webrtc.RTCSessionDescription(body.sdp);
  await peer.setRemoteDescription(desc);
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  const payload = {
    sdp: peer.localDescription,
  };
  logger.logInfo(`open broadcast for ${senderStream?.id}`);
  res.json(payload);
});

// close broadcast
app.delete('/broadcast', async ({ body }, res) => {
  logger.logInfo(`close broadcast for ${senderStream?.id}`);
  senderStream = undefined;
});

app.get('/', (req, res) => {
  res.send(`active remote connection: ${senderStream?.id}`);
  res.end();
});

function handleTrackEvent(e, peer) {
  // eslint-disable-next-line prefer-destructuring
  senderStream = e.streams[0];
}

export default class WebRtcServer {
  server: https.Server;

  // create a new WebRTC server with pfx certificate
  constructor(pfxCredentials: https.ServerOptions) {
    this.server = https.createServer(pfxCredentials, app);
  }

  async run(port: number): Promise<void> {
    this.server.listen(port);
  }
}
