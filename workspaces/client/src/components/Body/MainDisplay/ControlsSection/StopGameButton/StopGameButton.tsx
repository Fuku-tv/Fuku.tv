import * as React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import { useGameState } from 'src/state/hooks';

const StopGameButton: React.FC = () => {
  const { state, actions } = useGameState();
  const stopIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="stop"
      className="svg-inline--fa fa-stop fa-w-14"
      role="img"
      viewBox="0 0 448 512"
    >
      <path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z" />
    </svg>
  );
  return (
    <div className="stop-game-button-container">
      <button id="btnStop" onPointerDown={actions.buttonDownEvent} onPointerUp={actions.buttonUpEvent} data-type="stop" className="round">
        <AwesomeButton size="large" type="primary">
          <div className="button-inner-wrapper">
            <span>{stopIcon}</span>
          </div>
        </AwesomeButton>
      </button>
    </div>
  );
};

export default StopGameButton;
