import { css } from '@emotion/css';
import * as React from 'react';

import { useGameState } from 'src/state/hooks';
import ConfettiBackdrop from '../UIElements/ConfettiBackdrop/ConfettiBackdrop';

interface Props {
  height: number | string;
  width: number | string;
}

const VideoFeed: React.FC<Props> = (props) => {
  const { actions, state } = useGameState();
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    actions.startStream(canvasRef.current);

    return () => {
      actions.endStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {state.winnerModalActive && <ConfettiBackdrop />}
      <canvas
        className={css`
          width: 100%;
          display: block;
          max-height: 500px;
        `}
        ref={canvasRef}
        width={props.width}
        height={props.height}
      />
    </>
  );
};

export default VideoFeed;
