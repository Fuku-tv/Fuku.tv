import * as React from 'react';

import './DepthButton.scss';

import { useAuthState, useGameState } from 'src/state/hooks';

interface Props {
  // onClick?: () => void;
  onPointerDown?: () => void;
  onPointerUp?: () => void;
  id: string;
  buttonText: string | JSX.Element;
  width?: number;
  height?: number;
  color?: string;
  center?: boolean;
  borderRadius?: number;
}

const DepthButton: React.FC<Props> = ({ buttonText, id, width, height, onPointerUp, onPointerDown, center, color, borderRadius }) => {
  const { actions, state } = useGameState();
  const authState = useAuthState();
  const [buttonIsDown, setButtonIsDown] = React.useState<boolean>(false);

  const buttonStyles = {
    width,
    height,
    margin: !center ? '0 6px' : '0 auto',
  };

  const buttonContentWrapperStyles = {
    borderRadius: borderRadius || 3,
  };
  const shadowStyles = {
    height,
    borderRadius: borderRadius || 3,
  };

  const mouseDownHandler = () => {
    // actions.buttonDownEvent();
    setButtonIsDown(true);
    if (state.winnerModalActive) {
      actions.toggleWinnerModal();
    }
    console.log('down');
  };
  const mouseUpHandler = () => {
    // actions.buttonUpEvent();
    if (state.winnerModalActive) {
      actions.toggleWinnerModal();
    }
    setButtonIsDown(false);
    console.log('up');
  };

  const depthButtonContent = (
    <div
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      style={buttonStyles}
      role="button"
      tabIndex={0}
      className="depth-button2-container"
    >
      <div style={shadowStyles} className={`shadow ${color}`} />
      <button type="button" onPointerUp={onPointerUp} onPointerDown={onPointerDown} className={buttonIsDown ? 'button--down' : ''} id={id}>
        <div style={buttonContentWrapperStyles} className={`button__content-wrapper ${color}`}>
          {buttonText}
        </div>
      </button>
    </div>
  );
  const transparentButtonContent = (
    <button type="button" className="transparent-button" onPointerUp={onPointerUp} onPointerDown={onPointerDown} id={id}>
      <div style={buttonContentWrapperStyles} className={`button__content-wrapper ${color}`}>
        {buttonText}
      </div>
    </button>
  );

  return color === 'transparent' ? transparentButtonContent : depthButtonContent;
};

export default DepthButton;
