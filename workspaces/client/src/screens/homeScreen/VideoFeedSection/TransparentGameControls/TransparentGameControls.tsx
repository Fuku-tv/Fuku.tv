import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import Timer from 'src/components/game/Timer/Timer';
import DepthButton from 'src/components/UIElements/DepthButton/DepthButton';
import SlideableContent from 'src/components/UIElements/SlideableContent/SlideableContent';
import SwitchCameraButton from 'src/components/UIElements/SwitchCameraButton/SwitchCameraButton';

import { CSSTransition } from 'react-transition-group';
import DropClawButton from '../../ContentSection/LoggedInContent/GameComponents/DropClawButton/DropClawButton';
import ControlButton from '../../ContentSection/LoggedInContent/GameComponents/Controls/ControlButton';
import './TransparentGameControls.scss';

const TransparentGameControls: React.FC = () => {
  const { state, actions } = useGameState();
  const gameplay = state.gameStatus === 'gameplay';
  const buttonControls = React.useRef(null);

  const forwardContolBtns = (
    <>
      <ControlButton
        color="transparent"
        onButtonDown={() => actions.buttonDownEvent('up')}
        onButtonUp={() => actions.buttonUpEvent('up')}
        direction="up"
      />
      <div className="left-right-row">
        <ControlButton
          color="transparent"
          onButtonDown={() => actions.buttonDownEvent('left')}
          onButtonUp={() => actions.buttonUpEvent('left')}
          direction="left"
        />
        <ControlButton
          color="transparent"
          onButtonDown={() => actions.buttonDownEvent('right')}
          onButtonUp={() => actions.buttonUpEvent('right')}
          direction="right"
        />
      </div>
      <ControlButton
        color="transparent"
        onButtonDown={() => actions.buttonDownEvent('down')}
        onButtonUp={() => actions.buttonUpEvent('down')}
        direction="down"
      />
    </>
  );
  const sideContolBtns = (
    <>
      <ControlButton
        color="transparent"
        onButtonDown={() => actions.buttonDownEvent('left')}
        onButtonUp={() => actions.buttonUpEvent('left')}
        direction="up"
      />
      <div className="left-right-row">
        <ControlButton
          color="transparent"
          onButtonDown={() => actions.buttonDownEvent('down')}
          onButtonUp={() => actions.buttonUpEvent('down')}
          direction="left"
        />
        <ControlButton
          color="transparent"
          onButtonDown={() => actions.buttonDownEvent('up')}
          onButtonUp={() => actions.buttonUpEvent('up')}
          direction="right"
        />
      </div>
      <ControlButton
        color="transparent"
        onButtonDown={() => actions.buttonDownEvent('right')}
        onButtonUp={() => actions.buttonUpEvent('right')}
        direction="down"
      />
    </>
  );

  const arrowBtns = <div ref={buttonControls} className="button-controls-container" />;

  const btnContent = (
    <div className="content-wrapper">
      <Timer />
      <DropClawButton />
      <SwitchCameraButton />

      <div className="button-controls-container">{state.cameraIsForward ? forwardContolBtns : sideContolBtns}</div>
    </div>
  );

  return (
    <SlideableContent direction={!gameplay ? 'up' : 'down'} show={gameplay}>
      <div id="transparent-game-controls" className="controls-container">
        {btnContent}
      </div>
    </SlideableContent>
  );
};

export default TransparentGameControls;
