import confetti from 'canvas-confetti';
import React from 'react';
import { css, cx } from '@emotion/css';

import * as styles from './Confetti.module.scss';

const box = css`
  background-color: red;
  &:hover {
    background-color: green;
  }
`;

const ConfettiTest = () => {
  const click = (e) => {
    confetti();
  };

  return (
    <div className={styles.confetti}>
      <button type="button" onClick={click} className={box}>
        Click Confetti
      </button>
    </div>
  );
};

export default {
  title: 'Confetti',
  component: ConfettiTest,
};

export const ConfettiWithOptions = () => <ConfettiTest />;
