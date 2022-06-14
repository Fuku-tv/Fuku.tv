import { Button } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { createBroadcaster } from 'src/services/webRtcViewer';
import type { Socket } from 'socket.io-client';

const TestScreen = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = React.useState<MediaStream>(null);
  const [socket, setSocket] = React.useState<Socket>(null);

  const startStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true });
    const localSocket = createBroadcaster(localStream);

    // call.answer();
    // stream.getTracks().forEach((track) => peer.addTrack(track, stream));
    videoRef.current.srcObject = localStream;

    localSocket.emit('broadcaster');

    // save local socket and stream to destory on unmount
    setStream(localStream);
    setSocket(localSocket);
  };

  const stopStream = () => {
    if (socket) {
      socket.close();
      // needed to destroy the peer connection
      setSocket(null);
    }
    if (stream) stream.getTracks().forEach((track) => track.stop());
  };

  useEffect(() => {
    console.log('useEffect');
    return () => {
      stopStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
