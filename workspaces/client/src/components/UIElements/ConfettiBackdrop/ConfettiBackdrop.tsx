import * as React from 'react';

import ReactDOM from 'react-dom';
import confetti from 'canvas-confetti';
import useAuthState from 'src/state/hooks/useAuthState';
import { useGameState } from 'src/state/hooks';
import './ConfettiBackdrop.scss';
import { gameActions } from 'src/state/actions';

interface Props {
  onClick?: () => void;
}
const ConfettiBackdrop: React.FC<Props> = ({ onClick }) => {
  const { state, actions } = useAuthState();
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
    const end = Date.now() + 15 * 1000;
    const colors = ['#FF70FA', '#e2a803'];
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
  // }, []);

  const content = (
    <div className="confetti-backdrop" onKeyDown={() => removeConfetti()} onClick={() => removeConfetti()} role="button" tabIndex={0}>
      <div className="player-congrats">
        <h2 className="player-name">Congratulations!</h2>
        <div className="value-won">
          {state.name} won <span id="value">{gameState.state.pointsWon}</span> points!
        </div>
      </div>
      <canvas ref={canvasRef} id="confetti" height="100%" width="100%" />
    </div>
  );
  return content;
};

export default ConfettiBackdrop;
