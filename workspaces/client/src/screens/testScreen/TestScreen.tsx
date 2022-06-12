import { Button } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { createBroadcaster } from 'src/services/webRtcViewer';

const TestScreen = () => {
  const videoRef = useRef(null);

  const startStream = async () => {
    const peer = createBroadcaster();
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
    videoRef.current.srcObject = stream;
  };

  const stopStream = async () => {};

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
