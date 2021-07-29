import confetti from 'canvas-confetti';
import React from 'react';

const ConfettiTest = () => {
  const click = (e) => {
    confetti();
  };

  return (
    <div>
      <button onClick={click}>Click Confetti</button>
    </div>
  );
};

export default {
  title: 'Confetti',
  component: ConfettiTest,
};

export const ConfettiWithOptions = () => <ConfettiTest />;
