import * as React from 'react';
// import {Buttons} from '../../../Buttons';
import { useGameState } from 'src/state/hooks';
import DepthButton from 'src/components/UIElements/DepthButton/DepthButton';

const StartGameStopGameButtons: React.FC = () => {
  // const old = <Buttons/>;
  const { state, actions } = useGameState();

  return (
    <div id="start" className="start-stop-buttons-container">
      <DepthButton
        onPointerUp={() => actions.buttonUpEvent('stop')}
        onPointerDown={() => actions.buttonDownEvent('stop')}
        id="btnStop"
        buttonText="End Game"
        width={110}
        height={42}
        color="red"
      />

      <DepthButton
        onPointerUp={() => actions.buttonUpEvent('start')}
        onPointerDown={() => actions.buttonDownEvent('start')}
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
