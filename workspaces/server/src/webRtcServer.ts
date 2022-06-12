import webrtc from 'wrtc';
import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

let senderStream;

const app = express();

// parse body to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// enable cors
app.use(cors());

app.post('/consumer', async ({ body }, res) => {
  const peer = new webrtc.RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.stunprotocol.org',
      },
    ],
  });
  const desc = new webrtc.RTCSessionDescription(body.sdp);
  await peer.setRemoteDescription(desc);
  if (!senderStream) {
    res.end('error, no sender stream');
    return;
  }
  senderStream.getTracks().forEach((track) => peer.addTrack(track, senderStream));
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  const payload = {
    sdp: peer.localDescription,
  };

  res.json(payload);
});

app.post('/broadcast', async ({ body }, res) => {
  const peer = new webrtc.RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.stunprotocol.org',
      },
    ],
  });
  peer.ontrack = (e) => handleTrackEvent(e, peer);
  const desc = new webrtc.RTCSessionDescription(body.sdp);
  await peer.setRemoteDescription(desc);
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  const payload = {
    sdp: peer.localDescription,
  };

  res.json(payload);
});

app.get('/', (req, res) => {
  res.send(`active remote connections: ${JSON.stringify(senderStream, null, 4)}`);
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
