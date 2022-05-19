import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import DepthButton from 'src/components/UIElements/DepthButton/DepthButton';
import SlideableContent from 'src/components/UIElements/SlideableContent/SlideableContent';
import TitleDescription from 'src/components/UIElements/TitleDescription/TitleDescription';
import { HStack } from '@chakra-ui/react';
import StartGameStopGameButtons from './StartGameStopGameButtons';

interface Props {
  gameStatus: string;
}

const ReadyToGoScreen: React.FC<Props> = ({ gameStatus }) => {
  const { state, actions } = useGameState();

  const pointsScreen = (
    <>
      <TitleDescription
        title="Out of Credits"
        descriptionStart="You have"
        dynamicNumber={state.points}
        descriptionEnd="points, you can trade 200 points for another round or purchase more credits"
      />{' '}
      <HStack justifyContent="center">
        <DepthButton
          onPointerUp={() => actions.buttonUpEvent('stop')}
          onPointerDown={() => actions.buttonDownEvent('stop')}
          id="btnStop"
          buttonText="End Game"
          width={110}
          height={42}
          color="red"
        />
        {/* <DepthButton onPointerUp={() => history.push('/store')} id="btnStop" buttonText="Buy Credits" width={160} height={42} color="purple" /> */}
        <DepthButton
          onPointerUp={() => actions.buttonDownEvent('start')}
          onPointerDown={() => actions.buttonUpEvent('start')}
          id="spend-points-button"
          buttonText="Trade Points"
          width={110}
          height={42}
          color="purple"
        />
      </HStack>
    </>
  );

  const creditsScreen = (
    <>
      <TitleDescription
        title="Ready to Play?"
        descriptionStart="You have"
        dynamicNumber={state.freeplay > 0 ? state.freeplay : state.credits}
        descriptionEnd={state.freeplay > 0 ? 'freeplay tickets left!' : 'credits left!'}
      />
      <StartGameStopGameButtons />
    </>
  );

  // const readyToGoScreenContent = state.freeplay < 0 ? readyToGoScreenContent : creditsScreen;
  // if () readyToGoScreenContent = pointsScreen;
  // else if (state.freeplay < 0) readyToGoScreenContent = creditsScreen;

  return (
    <>
      <SlideableContent
        direction={state.gameStatus === 'gameplay' ? 'left' : 'right'}
        show={gameStatus === 'controlsVisible' && state.gameStatus === 'gamestandby'}
      >
        {state.credits <= 0 && state.freeplay <= 0 ? pointsScreen : creditsScreen}
      </SlideableContent>
    </>
  );
};

export default ReadyToGoScreen;
