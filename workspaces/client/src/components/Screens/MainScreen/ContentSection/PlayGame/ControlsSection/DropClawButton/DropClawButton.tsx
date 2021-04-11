import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import DepthButton from 'src/components/UIElements/DepthButton/DepthButton';

import './DropClawButton.scss';

const DropClawButton: React.FC = () => {
  const { state, actions } = useGameState();
  const clawIcon = (
    <svg id="claw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 80">
      <path
        d="M294.5,74.5h-68a2,2,0,0,0-2,2v4a10,10,0,0,0,10,10h14v6a2,2,0,0,0,2,2h8v13.23L241,131.16a2,2,0,0,0-.37,2.08l8,20a2,2,0,0,0,1.86,1.26,1.91,1.91,0,0,0,.74-.14,2,2,0,0,0,1.12-2.6l-7.54-18.85,13.68-15.2V152.5a2,2,0,0,0,4,0V117.71l13.68,15.2-7.54,18.85a2,2,0,0,0,1.12,2.6,1.91,1.91,0,0,0,.74.14,2,2,0,0,0,1.86-1.26l8-20a2,2,0,0,0-.37-2.08L262.5,111.73V98.5h8a2,2,0,0,0,2-2v-6h14a10,10,0,0,0,10-10v-4A2,2,0,0,0,294.5,74.5Zm-26,20h-16v-4h16Zm24-14a6,6,0,0,1-6,6h-52a6,6,0,0,1-6-6v-2h64Z"
        transform="translate(-224.5 -74.5)"
      />
    </svg>
  );

  const text = (
    <>
      {clawIcon}
      <span>Drop The Claw</span>
    </>
  );
  return (
    <div className="drop-claw-button-container">
      <DepthButton
        id="btnDrop"
        onPointerDown={() => actions.buttonDownEvent('drop')}
        buttonText={text}
        width={140}
        height={110}
        borderRadius={3}
        color="yellow"
      />
    </div>
  );
};

export default DropClawButton;
