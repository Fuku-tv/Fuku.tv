import * as React from 'react';

import { useGameState } from 'src/state/hooks';

interface Props {
  height: number | string;
  width: number | string;
}

const VideoFeed: React.FC<Props> = (props) => {
  const { actions, state } = useGameState();
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    actions.startStream(canvasRef.current);
    actions.mountStore();
    return () => {
      actions.endStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <canvas ref={canvasRef} width={props.width} height={props.height} />;
};

export default VideoFeed;
