import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import DepthButton from 'src/components/UIElements/DepthButton/DepthButton';
import { Flex } from '@chakra-ui/react';

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
    <Flex justifyContent="center" alignItems="center">
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
    </Flex>
  );
};

export default StartGameStopGameButtons;
