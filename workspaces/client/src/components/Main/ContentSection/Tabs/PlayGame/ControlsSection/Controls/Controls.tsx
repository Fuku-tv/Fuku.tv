import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import ControlButton from './ControlButton';
import DropClawButton from '../DropClawButton/DropClawButton';
import './Controls.scss';

const Controls: React.FC = () => {
  const { state, actions } = useGameState();
  const gameplay = state.gameStatus === 'gameplay';
  const forwardContolBtns = (
    <>
      <ControlButton onButtonDown={actions.buttonDownEvent} onButtonUp={actions.buttonUpEvent} type="up" direction="up" />
      <div className="left-right-row">
        <ControlButton onButtonDown={actions.buttonDownEvent} onButtonUp={actions.buttonUpEvent} type="left" direction="left" />
        <ControlButton onButtonDown={actions.buttonDownEvent} onButtonUp={actions.buttonUpEvent} type="right" direction="right" />
      </div>
      <ControlButton onButtonDown={actions.buttonDownEvent} onButtonUp={actions.buttonUpEvent} type="down" direction="down" />
    </>
  );
  const sideContolBtns = (
    <>
      <ControlButton onButtonDown={actions.buttonDownEvent} onButtonUp={actions.buttonUpEvent} type="left" direction="up" />
      <div className="left-right-row">
        <ControlButton onButtonDown={actions.buttonDownEvent} onButtonUp={actions.buttonUpEvent} type="down" direction="left" />
        <ControlButton onButtonDown={actions.buttonDownEvent} onButtonUp={actions.buttonUpEvent} type="up" direction="right" />
      </div>
      <ControlButton onButtonDown={actions.buttonDownEvent} onButtonUp={actions.buttonUpEvent} type="right" direction="down" />
    </>
  );

  const dropClawBtn = (
    <div className="drop-claw-button-container">
      <DropClawButton />
    </div>
  );

  const arrowBtns = <div className="button-controls-container">{state.cameraIsForward ? forwardContolBtns : sideContolBtns}</div>;

  return (
    <div id="controls" className="controls-container">
      {gameplay && (
        <div className="control-buttons-container">
          {dropClawBtn}
          {arrowBtns}
        </div>
      )}
    </div>
  );
};

export default Controls;
