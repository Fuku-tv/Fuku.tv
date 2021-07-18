import * as React from 'react';
// import {Buttons} from '../../../Buttons';
import { useGameState } from 'src/state/hooks';
import DepthButton from 'src/components/UIElements/DepthButton/DepthButton';
import SlideableContent from 'src/components/UIElements/SlideableContent/SlideableContent';
import PointsForCreditsModal from 'src/components/UIElements/PointsForCreditsModal/PointsForCreditsModal';
import TitleDescription from 'src/components/UIElements/TitleDescription/TitleDescription';
import Controls from '../GameComponents/Controls/Controls';
import StartGameStopGameButtons from './StartGameStopGameButtons';

interface PROPS {
  gameStatus: string;
}

const ReadyToGoScreen: React.FC<PROPS> = ({ gameStatus }) => {
  // const old = <Buttons/>;
  const { state, actions } = useGameState();
  const [modalIsActive, setModalIsActive] = React.useState<boolean>(false);

  // const controlsVisible = state.gameStatus === 'gamestandby' || state.gameStatus === 'gameplay';
  // const gamestandby = state.gameStatus === 'gamestandby';
  // const gameplay = state.gameStatus === 'gameplay';

  const pointsScreen = (
    <>
      <TitleDescription
        title="Out of Credits"
        descriptionStart="You have"
        dynamicNumber={state.points}
        descriptionEnd="points, trade them in for more credits?"
      />{' '}
      <DepthButton id="spend-points-button" buttonText="" />
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
          onPointerUp={() => setModalIsActive(true)}
          onPointerDown={() => setModalIsActive(true)}
          id="spend-points-button"
          buttonText="Yes, Let's Trade"
          width={160}
          height={42}
          color="purple"
        />
      </div>
    </>
  );

  const creditsScreen = (
    <>
      <TitleDescription
        title="Ready to Play?"
        descriptionStart="You have"
        dynamicNumber={state.freeplay > 0 ? state.freeplay : state.credits}
        descriptionEnd={state.freeplay > 0 ? 'freeplay tickets left!' : 'credits left!'}
      />{' '}
      <StartGameStopGameButtons />
    </>
  );

  // const readyToGoScreenContent = state.freeplay < 0 ? readyToGoScreenContent : creditsScreen;
  // if () readyToGoScreenContent = pointsScreen;
  // else if (state.freeplay < 0) readyToGoScreenContent = creditsScreen;

  return (
    <>
      <PointsForCreditsModal closeDrawer={() => setModalIsActive(false)} show={modalIsActive} />
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
