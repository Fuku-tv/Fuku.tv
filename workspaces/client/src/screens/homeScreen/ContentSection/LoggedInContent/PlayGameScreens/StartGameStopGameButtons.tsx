import * as React from 'react';
// import {Buttons} from '../../../Buttons';
import { useGameState } from 'src/state/hooks';
import DepthButton from 'src/components/UIElements/DepthButton/DepthButton';

const StartGameStopGameButtons: React.FC = () => {
  // const old = <Buttons/>;
  const { state, actions } = useGameState();
  const pointerUpHandler = (action) => {
    if (state.winnerModalActive) {
      actions.toggleWinnerModal();
    }
    actions.buttonUpEvent(action);
  };
  const pointerDownpHandler = (action) => {
    if (state.winnerModalActive) {
      actions.toggleWinnerModal();
    }
    actions.buttonDownEvent(action);
  };

  return (
    <div id="start" className="start-stop-buttons-container">
      <DepthButton
        onPointerUp={() => pointerUpHandler('stop')}
        onPointerDown={() => pointerDownpHandler('stop')}
        id="btnStop"
        buttonText="End Game"
        width={110}
        height={42}
        color="red"
      />

      <DepthButton
        onPointerUp={() => pointerUpHandler('start')}
        onPointerDown={() => pointerDownpHandler('start')}
        id="btnStart"
        buttonText="Start Round"
        width={160}
        height={42}
        color="purple"
      />
    </div>
  );
};

export default StartGameStopGameButtons;
