import { Button } from '@chakra-ui/react';
import { css } from '@emotion/css';
import * as React from 'react';
import * as webRtcViewer from 'src/services/webRtcViewer';

import { useGameState } from 'src/state/hooks';
import ConfettiBackdrop from '../UIElements/ConfettiBackdrop/ConfettiBackdrop';

interface Props {
  height: number | string;
  width: number | string;
}

const VideoFeed: React.FC<Props> = (props) => {
  const { actions, state } = useGameState();
  const videoRef = React.useRef(null);

  const start = () => {
    const peer = webRtcViewer.createPeer();

    peer.ontrack = (event) => {
      // check for valid videorRef

      console.log('got remote track', event.streams[0]);
      // eslint-disable-next-line prefer-destructuring
      videoRef.current.srcObject = event.streams[0];
    };
  };
  React.useEffect(() => {
    start();
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
