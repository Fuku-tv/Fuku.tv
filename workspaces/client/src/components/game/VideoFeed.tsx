import { Button } from '@chakra-ui/react';
import { css } from '@emotion/css';
import * as React from 'react';
import * as webRtcViewer from 'src/services/webRtcViewer';

import { useGameState } from 'src/state/hooks';
import type { Socket } from 'socket.io-client';
import ConfettiBackdrop from '../UIElements/ConfettiBackdrop/ConfettiBackdrop';

interface Props {
  height: number | string;
  width: number | string;
}

const VideoFeed: React.FC<Props> = (props) => {
  const { actions, state } = useGameState();
  const [stream, setStream] = React.useState<MediaStream>(null);
  const [socket, setSocket] = React.useState<Socket>(null);
  const videoRef = React.useRef(null);

  const start = React.useCallback(async () => {
    const peer = webRtcViewer.createViewer((remoteStream) => {
      videoRef.current.srcObject = remoteStream;
    });
    setSocket(peer);
    setStream(stream);
  }, [stream]);
  React.useEffect(() => {
    start();
    return () => {
      if (socket) socket.close();
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {state.winnerModalActive && <ConfettiBackdrop />}

      <video
        className={css`
          width: 100%;
          display: block;
          max-height: 500px;
        `}
        autoPlay
        muted
        ref={videoRef}
        width={props.width}
        height={props.height}
      >
        <track kind="captions" />
      </video>
    </>
  );
};

export default VideoFeed;
