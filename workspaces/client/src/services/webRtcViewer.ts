import { getWebRtcServerURL } from 'fuku.tv-shared/env';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

const WEBRTC_URL = getWebRtcServerURL();

export function createViewer(callback: (stream: MediaStream) => void): Socket {
  const socket = io(WEBRTC_URL);
  const peerConnection = new RTCPeerConnection();
  socket.on('offer', (id, description) => {
    peerConnection
      .setRemoteDescription(description)
      .then(() => peerConnection.createAnswer())
      .then((sdp) => peerConnection.setLocalDescription(sdp))
      .then(() => {
        socket.emit('answer', id, peerConnection.localDescription);
      });
    peerConnection.ontrack = (event) => {
      callback(event.streams[0]);
      // video.srcObject = event.streams[0];
    };
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('candidate', id, event.candidate);
      }
    };
  });

  socket.on('candidate', (id, candidate) => {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch((e) => console.error(e));
  });

  socket.on('connect', () => {
    socket.emit('watcher');
  });

  socket.on('broadcaster', () => {
    socket.emit('watcher');
  });

  return socket;
}

export function createBroadcaster(stream: MediaStream): Socket {
  const peerConnections: { [key: string]: RTCPeerConnection } = {};
  const socket = io(WEBRTC_URL);
  // complete connection with watcher
  socket.on('answer', (id, description) => {
    peerConnections[id].setRemoteDescription(description);
  });
  // new watcher is connecting
  socket.on('watcher', (id) => {
    const peerConnection = new RTCPeerConnection();
    peerConnections[id] = peerConnection;

    stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('candidate', id, event.candidate);
      }
    };

    peerConnection
      .createOffer()
      .then((sdp) => peerConnection.setLocalDescription(sdp))
      .then(() => {
        socket.emit('offer', id, peerConnection.localDescription);
      });
  });
  // watcher has a new ICE candidate
  socket.on('candidate', (id, candidate) => {
    peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
  });
  // watcher has disconnected
  socket.on('disconnectPeer', (id) => {
    console.log('peer disconnected', id);
    peerConnections[id].close();
    delete peerConnections[id];
  });
  return socket;
}
