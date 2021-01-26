import * as React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import { useGameState } from 'src/state/hooks';

const StartGameButton: React.FC = () => {
  const { state, actions } = useGameState();
  return (
    <div className="start-game-button-container">
      <button id="btnStart" onPointerDown={actions.buttonDownEvent} onPointerUp={actions.buttonUpEvent} data-type="start">
        <AwesomeButton size="normal" type="primary">
          <div className="button-inner-wrapper">
            <div className="button-inner-wrapper">
              <span>Start Round</span>
            </div>
          </div>
        </AwesomeButton>
      </button>
    </div>
  );
};

export default StartGameButton;
