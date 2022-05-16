import { css } from '@emotion/css';
import React from 'react';

const DonateButton: React.FC = () => (
  <div
    className={css`
      position: relative;
    `}
  >
    <a
      className={css`
        display: block;
        font-size: 32px;
        text-align: center;
        text-decoration: none;
        padding: 8px 16px;
        background-color: purple;
        color: white;
      `}
      href="https://nowpayments.io/donation/fuku"
    >
      Donate
    </a>
  </div>
);

export default DonateButton;
