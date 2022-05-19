import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';

import TimerBox from './TimerBox';

const Timer: React.FC = () => {
  const { state } = useGameState();
  const [timerIsActive, setTimerIsActive] = React.useState<boolean>(true);
  const [duration, setDuration] = React.useState<number>(state.timer);
  const currentTime = React.useRef(null);
  const prevTime = React.useRef(null);
  const isNewTimeFirstTick = React.useRef<boolean>(false);
  const [, setOneLastRerender] = React.useState<number>(0);
  const size = useBreakpointValue({ base: 80, md: 110 });
  const strokeWidth = useBreakpointValue({ base: 3, md: 5 });

  React.useEffect(() => {
    setDuration(state.timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

    return (
      <Box position="relative" borderRadius="50px" width="calc(100% - 10px)" height="calc(100% - 10px)" overflow="hidden">
        <TimerBox>{remainingTime === 0 ? <Box fontSize={{ base: '12px', md: '16px' }}>Time&apos;s Up!</Box> : remainingTime}</TimerBox>
      </Box>
    );
  };
  return (
    <Flex position="relative" justifyContent="center">
      <CountdownCircleTimer
        isPlaying={timerIsActive}
        duration={duration}
        colors={['#a07bd9', '#ffd651', '#ff3c3c']}
        colorsTime={[20, 10, 0]}
        size={size}
        strokeWidth={strokeWidth}
        onComplete={() => setTimerIsActive(false)}
      >
        {renderTime}
      </CountdownCircleTimer>
    </Flex>
  );
};
export default Timer;
