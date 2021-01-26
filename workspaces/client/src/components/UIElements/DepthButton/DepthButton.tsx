import * as React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import './DepthButton.scss';

import { useAuthState, useGameState } from 'src/state/hooks';

interface Props {
  dataType: string;
  onClick?: () => void;
  isSignedIn?: boolean;
  id: string;
  buttonText: string;
  buttonSizeLarge?: any;
  buttonIcon?: any;
  width?: number;
  height?: number;
  type?: string;
}

const DepthButton: React.FC<Props> = ({ dataType, onClick, isSignedIn, buttonText, id, buttonSizeLarge, buttonIcon, width, height, type }) => {
  const { actions, state } = useGameState();
  const authState = useAuthState();
  const visible =
    (state.gameStatus === 'init' || state.gameStatus === 'gameplayend' || state.gameStatus === 'gameend') && authState.state.isAuthenticated;
  const playBtn = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="play"
      className="svg-inline--fa fa-play fa-w-14"
      role="img"
      viewBox="0 0 448 512"
    >
      <path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
    </svg>
  );

  const buttonStyles = {
    width,
    height,
  };
  return (
    <div className="depth-button-container">
      <button onPointerUp={actions.buttonUpEvent} onPointerDown={actions.buttonDownEvent} id={id} data-type={dataType} style={buttonStyles}>
        <AwesomeButton type={type} size={buttonSizeLarge ? 'large' : 'normal'}>
          <div className="button-inner-wrapper">
            <span>{buttonText}</span>
          </div>
        </AwesomeButton>
      </button>
    </div>
  );
};

export default DepthButton;
