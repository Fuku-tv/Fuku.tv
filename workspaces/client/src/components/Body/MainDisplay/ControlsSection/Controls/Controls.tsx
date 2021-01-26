import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import DepthButton from 'src/components/UIElements/DepthButton/DepthButton';
import ControlButton from './ControlButton';
import DropClawButton from '../DropClawButton/DropClawButton';
// import StopGameButton from '../StopGameButton/StopGameButton'; import
// StartGameButton from '../StartGameButton/StartGameButton';
import SwitchCameraButton from '../../VideoFeedSection/SwitchCameraButton/SwitchCameraButton';
import './Controls.scss';

const Controls: React.FC = () => {
  const { state, actions } = useGameState();
  const gameplay = state.gameStatus === 'gameplay';
  const forwardContolBtns = (
    <>
      {' '}
      <ControlButton onButtonDown={actions.buttonDownEvent} onButtonUp={actions.buttonUpEvent} type="up" direction="up" />{' '}
      <div className="left-right-row">
        {' '}
        <ControlButton onButtonDown={actions.buttonDownEvent} onButtonUp={actions.buttonUpEvent} type="left" direction="left" />{' '}
        <ControlButton onButtonDown={actions.buttonDownEvent} onButtonUp={actions.buttonUpEvent} type="right" direction="right" />{' '}
      </div>{' '}
      <ControlButton onButtonDown={actions.buttonDownEvent} onButtonUp={actions.buttonUpEvent} type="down" direction="down" />{' '}
    </>
  );
  const sideContolBtns = (
    <>
      {' '}
      <ControlButton onButtonDown={actions.buttonDownEvent} onButtonUp={actions.buttonUpEvent} type="left" direction="up" />{' '}
      <div className="left-right-row">
        {' '}
        <ControlButton onButtonDown={actions.buttonDownEvent} onButtonUp={actions.buttonUpEvent} type="down" direction="left" />{' '}
        <ControlButton onButtonDown={actions.buttonDownEvent} onButtonUp={actions.buttonUpEvent} type="up" direction="right" />{' '}
      </div>{' '}
      <ControlButton onButtonDown={actions.buttonDownEvent} onButtonUp={actions.buttonUpEvent} type="right" direction="down" />{' '}
    </>
  );

  const dropClawBtn = (
    <div className="drop-claw-button-container">
      <DropClawButton />
    </div>
  );

  // const startGameStopGameBtns = (   <div id="start"
  // className="start-stop-buttons-container">     <DepthButton
  // buttonSizeLarge       id="btnStop"       dataType="stop"
  // buttonText="End Game"       type='secondary'       height={50}/>
  // <DepthButton       buttonSizeLarge       id="btnStart"       dataType="start"
  //       buttonText="Start Round"       width={160}       height={50}/>   </div>
  // );

  const arrowBtns = <div className="button-controls-container">{state.cameraIsForward ? forwardContolBtns : sideContolBtns}</div>;

  // const cont = (   <div className="button-controls-container"
  // style={{transform: props.cameraIsFront? 'rotate(0deg)': 'rotate(90deg)'}}>
  // <ControlButton id="btnLeft" type="up"/>     <div className="left-right-row">
  // <ControlButton id="btnDown" type="left"/>       <ControlButton id="btnUp"
  // type="right"/>     </div>     <ControlButton id="btnRight" type="down"/>
  // </div> );

  return (
    <div id="controls" className="controls-container">
      {gameplay && (
        <div className="control-buttons-container">
          {dropClawBtn}
          {arrowBtns}
        </div>
      )}

      {gameplay && <SwitchCameraButton />}
    </div>
  );
};

export default Controls;
