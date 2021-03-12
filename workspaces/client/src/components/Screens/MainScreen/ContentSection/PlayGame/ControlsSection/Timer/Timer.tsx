import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { isMobile } from 'react-device-detect';
import './Timer.scss';

const Timer: React.FC = () => {
  const { state, actions } = useGameState();
  const visible = state.gameStatus === 'gamestandby' || state.gameStatus === 'gameplay';
  const [timerIsActive, setTimerIsActive] = React.useState<boolean>(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const currentTime = React.useRef(null);
  const prevTime = React.useRef(null);
  const isNewTimeFirstTick = React.useRef<boolean>(false);
  const [, setOneLastRerender] = React.useState<number>(0);

  const renderTime = ({ remainingTime }) => {
    if (currentTime.current !== remainingTime) {
      isNewTimeFirstTick.current = true;
      prevTime.current = currentTime.current;
      currentTime.current = remainingTime;
    } else {
      isNewTimeFirstTick.current = false;
    }

    // force one last re-render when the time is over to tirgger the last animation
    if (remainingTime === 0) {
      setTimeout(() => {
        setOneLastRerender((val) => val + 1);
      }, 20);
    }

    const isTimeUp = isNewTimeFirstTick.current;
    if (remainingTime === 0) {
      return <div className="time-up">Time&apos;s Up!</div>;
    }

    return (
      <div className="time-wrapper">
        <div key={remainingTime} className={`time ${isTimeUp ? 'up' : ''}`}>
          {remainingTime}
        </div>
        {prevTime.current !== null && (
          <div key={prevTime.current} className={`time ${!isTimeUp ? 'down' : ''}`}>
            {prevTime.current}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="timer-container">
      <CountdownCircleTimer
        isPlaying={timerIsActive}
        duration={state.timer}
        colors={[['#5e3d91', 0.66], ['#bd9e3c', 0.88], ['#A30000']]}
        size={isMobile ? 50 : 80}
        strokeWidth={isMobile ? 3 : 5}
        onComplete={() => setTimerIsActive(false)}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};
export default Timer;
