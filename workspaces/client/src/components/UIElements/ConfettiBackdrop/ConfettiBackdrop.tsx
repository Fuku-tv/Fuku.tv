import * as React from 'react';

import confetti from 'canvas-confetti';
import useAuthState from 'src/state/hooks/useAuthState';
import { useGameState } from 'src/state/hooks';
import { Box, Button } from '@chakra-ui/react';
import { css } from '@emotion/css';

interface Props {
  onClick?: () => void;
}
const ConfettiBackdrop: React.FC<Props> = ({ onClick }) => {
  const { state } = useAuthState();
  const gameState = useGameState();
  const canvasRef = React.useRef(null);
  const removeConfetti = () => {
    gameState.actions.toggleWinnerModal();
    confetti.reset();
  };

  const blastConfetti = () => {
    // Variables
    // const canvas: any = document.getElementById('confetti');
    const canvas = canvasRef.current;
    canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true });
    const count = 200;
    const defaults = {
      origin: { y: 1 },
    };
    //--
    // End Variables

    // Confetti Functions
    function randomConfetti() {
      canvas.confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 1 },
      });
    }
    function fire(particleRatio, opts) {
      canvas.confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    }
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    // ---

    // initial blast
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
    //---
    // End initial blast

    // Delayed confetti

    // const intervals = [2000, 4000, 6500, 7200, 8400, 9500, 11000, 12000];
    const intervals = [2000, 3458, 4800, 6500, 8400, 11000, 12000];

    intervals.forEach((num) => {
      setTimeout(() => {
        randomConfetti();
      }, num);
    });
    //---
    // End delayed confetti
  };

  // React.useEffect(() => {
  //   blastConfetti();
  //   return () => {
  //     removeConfetti();
  //   };

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const content = (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={10000}
      background="rgba(8, 8, 8, 0.657);"
      onKeyDown={() => removeConfetti()}
      onClick={() => removeConfetti()}
      role="button"
      tabIndex={0}
    >
      <Box position="absolute" top="50%" left="50%" textAlign="center" transform="translate(-50%, -50%)">
        <h2 style={{ fontSize: '32px' }}>Congratulations!</h2>
        <Box paddingTop="10px" fontSize="16px">
          {state.name} won{' '}
          <Box
            as="span"
            fontWeight="bold"
            position="relative"
            _after={{
              content: "''",
              position: 'absolute',
              bottom: 0,
              left: 0,
              backgroundColor: '#fff',
              height: '2px',
              width: '100%',
            }}
            id="value"
          >
            {gameState.state.pointsWon}
          </Box>{' '}
          points!
        </Box>
      </Box>
      <canvas
        ref={canvasRef}
        className={css`
          height: 100%;
          width: 100%;
        `}
      />
    </Box>
  );
  return content;
};

export default ConfettiBackdrop;
