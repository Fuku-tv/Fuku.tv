import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { isMobile } from 'react-device-detect';
import './HorizontalTimer.scss';

const HorizontalTimer: React.FC = () => {
  const { state, actions } = useGameState();
  const visible = state.gameStatus === 'gamestandby' || state.gameStatus === 'gameplay';
  const [timerIsActive, setTimerIsActive] = React.useState<boolean>(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const currentTime = React.useRef(null);
  const prevTime = React.useRef(null);
  const isNewTimeFirstTick = React.useRef<boolean>(false);
  const [, setOneLastRerender] = React.useState<number>(0);

  return (
    <div className="horizontal-timer-container">
      <div className="timer-value">{state.timer}</div>
      <div className="timer-bar">
        <div className="timer-bar__fill" />
      </div>
    </div>
  );
};
export default HorizontalTimer;
