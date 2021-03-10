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
  const [confettiIsActive, setConfettiIsActive] = React.useState<boolean>(true);
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
      <canvas ref={canvasRef} width={props.width} height={props.height} />
    </>
  );
};

export default VideoFeed;
