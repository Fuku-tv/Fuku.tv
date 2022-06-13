import axios from 'axios';
import { getWebRtcServerURL } from 'fuku.tv-shared/env';

const WEBRTC_URL = getWebRtcServerURL();

const config = {
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

export function createPeer(): RTCPeerConnection {
  const peer = new RTCPeerConnection(config);
  peer.addTransceiver('video', { direction: 'recvonly' });
  peer.onnegotiationneeded = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };

    const { data } = await axios.post(`${WEBRTC_URL}/consumer`, payload);

    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e) => console.log('no broadcaster is present', e));
  };

  return peer;
}

/**
 * test method for a client broadcaster via the web browser
 * @returns
 */
export function createBroadcaster(): RTCPeerConnection {
  const peer = new RTCPeerConnection(config);
  peer.onnegotiationneeded = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };

    const { data } = await axios.post(`${WEBRTC_URL}/broadcast`, payload);
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e) => console.log(e));
  };

  return peer;
}
