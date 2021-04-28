import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import './SwitchCameraButton.scss';

const SwitchCameraButton: React.FC = () => {
  const { actions } = useGameState();
  const cameraSwapIcon = (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 258.18 361.79">
      <path
        d="M192.31,339.46v-5.72a8.58,8.58,0,0,1,8.59-8.59H329.74V308a8.6,8.6,0,0,1,14.67-6.08L373,330.53a8.57,8.57,0,0,1,0,12.14l-28.63,28.64a8.6,8.6,0,0,1-14.67-6.08V348.05H200.9A8.58,8.58,0,0,1,192.31,339.46ZM292,378.88H163.19V361.7a8.6,8.6,0,0,0-14.67-6.07l-28.63,28.63a8.6,8.6,0,0,0,0,12.15L148.52,425A8.6,8.6,0,0,0,163.19,419V401.79H292a8.59,8.59,0,0,0,8.59-8.59v-5.73A8.58,8.58,0,0,0,292,378.88Z"
        transform="translate(-117.37 -65.77)"
      />
      <path
        d="M368.74,119.27V256.83a22.92,22.92,0,0,1-22.92,22.92H147.12a22.93,22.93,0,0,1-22.93-22.92V119.27a22.93,22.93,0,0,1,22.93-22.93h42L195,80.62a22.91,22.91,0,0,1,21.45-14.85h59.94a22.89,22.89,0,0,1,21.45,14.85l5.92,15.72h42A22.93,22.93,0,0,1,368.74,119.27Zm-65,68.78a57.32,57.32,0,1,0-57.31,57.31A57.36,57.36,0,0,0,303.78,188.05Zm-15.28,0a42,42,0,1,1-42-42A42.1,42.1,0,0,1,288.5,188.05Z"
        transform="translate(-117.37 -65.77)"
      />
    </svg>
  );
  return (
    <div className="switch-camera-button-container">
      <button id="btnCamera" onPointerDown={() => actions.buttonDownEvent('swapvideo')} data-type="swapvideo">
        {cameraSwapIcon}
      </button>
    </div>
  );
};

export default SwitchCameraButton;
