import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import './Timer.scss';

const Timer: React.FC = () => {
  const { state, actions } = useGameState();
  const visible = state.gameStatus === 'gamestandby' || state.gameStatus === 'gameplay';
  const progressRef = React.useRef(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const maxValue = React.useMemo(() => state.timer, [null]);

  return (
    <React.Fragment>
      <div className="timer-container">
        <div className="seconds-remaining">
          <span>{state.timer}</span>
        </div>
        <progress className={`warning`} id="timerBar" value={state.timer} max={maxValue} />
      </div>
    </React.Fragment>
  );
};

export default Timer;
