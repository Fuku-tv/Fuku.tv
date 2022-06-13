import { Button } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { createBroadcaster } from 'src/services/webRtcViewer';
import { getWebRtcServerURL } from 'fuku.tv-shared/env';

const TestScreen = () => {
  const videoRef = useRef(null);

  const startStream = async () => {
    const peer = createBroadcaster();
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
    videoRef.current.srcObject = stream;
  };

  const stopStream = () => {
    axios.delete(`${getWebRtcServerURL()}/broadcast`);
  };

  useEffect(() => {
    console.log('useEffect');
    return () => {
      stopStream();
    };
  }, []);

  return (
    <div>
      <h1>Broadcast test</h1>
      <Button onClick={startStream}>Start Stream</Button>
      <Button onClick={stopStream}>Stop Stream</Button>
      <video autoPlay ref={videoRef}>
        <track kind="captions" />
      </video>
    </div>
  );
};

export default TestScreen;
