import * as React from 'react';

import ReactDOM from 'react-dom';
import confetti from 'canvas-confetti';

import './Backdrop.scss';

const removeConfetti = () => {
  console.log({ confetti });
  confetti.reset();
};

const blastConfetti = () => {
  // Variables
  const canvas = document.getElementById('confetti');
  canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true });
  const end = Date.now() + 15 * 1000;
  const colors = ['#FF70FA', '#e2a803'];
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };
  //--
  // End Variables

  // Confetti Functions
  function randomConfetti() {
    canvas.confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.5 },
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

  const intervals = [2000, 4000, 6500, 7200, 8400, 9500, 11000, 12000];

  intervals.forEach((num) => {
    setTimeout(() => {
      randomConfetti();
    }, num);
  });
  //---
  // End delayed confetti
  (function frame() {
    canvas.confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    canvas.confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

interface Props {
  onClick?: () => void;
}
const Backdrop: React.FC<Props> = ({ onClick }) => {
  React.useEffect(() => {
    blastConfetti();
    return () => {
      removeConfetti();
    };
  }, []);

  const content = (
    <div className="backdrop" onKeyDown={onClick} role="button" tabIndex={0} onClick={onClick}>
      <canvas id="confetti" height="100%" width="100%" />
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('backdrop-hook'));
};

export default Backdrop;
