import * as React from 'react';
// import {Buttons} from '../../../Buttons';
import { useGameState } from 'src/state/hooks';
import DepthButton from 'src/components/UIElements/DepthButton/DepthButton';
import SlideableContent from 'src/components/UIElements/SlideableContent/SlideableContent';
import PointsForCreditsModal from 'src/components/UIElements/PointsForCreditsModal/PointsForCreditsModal';
import Controls from './Controls/Controls';
import TitleDescription from '../../../../../UIElements/TitleDescription/TitleDescription';

import './ControlsSection.scss';
import Timer from './Timer/Timer';

const ControlsSection: React.FC = () => {
  // const old = <Buttons/>;
  const { state, actions } = useGameState();
  const [modalIsActive, setModalIsActive] = React.useState<boolean>(false);
  const controlsVisible = state.gameStatus === 'gamestandby' || state.gameStatus === 'gameplay';
  const gamestandby = state.gameStatus === 'gamestandby';
  const gameplay = state.gameStatus === 'gameplay';

  const startGameStopGameBtns = (
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

  const letsPlayScreen = (
    <SlideableContent direction="left" show={!controlsVisible}>
      <div className="play-game-button-container">
        <TitleDescription
          title="Let's Play Fuku"
          descriptionStart="You currently have"
          dynamicNumber={state.queue}
          descriptionEnd="players in front of you."
        />

        <DepthButton
          onPointerDown={() => actions.enterQueue()}
          id="btnPlay"
          buttonText="Enter Player Queue"
          width={200}
          height={42}
          color="purple"
          center
        />
      </div>
    </SlideableContent>
  );

  const freeplayScreen = (
    <>
      <SlideableContent direction={gameplay ? 'left' : 'right'} show={controlsVisible && !gameplay}>
        <TitleDescription title="Ready to Play?" descriptionStart="You have" dynamicNumber={state.freeplay} descriptionEnd="freeplay tickets left!" />{' '}
        {startGameStopGameBtns}
      </SlideableContent>
    </>
  );

  const pointsScreen = (
    <>
      <SlideableContent direction={gameplay ? 'left' : 'right'} show={controlsVisible && !gameplay}>
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
      </SlideableContent>
    </>
  );

  const creditsScreen = (
    <>
      <SlideableContent direction={gameplay ? 'left' : 'right'} show={controlsVisible && !gameplay}>
        <TitleDescription title="Ready to Play?" descriptionStart="You have" dynamicNumber={state.credits} descriptionEnd="credits left!" />{' '}
        {startGameStopGameBtns}
      </SlideableContent>
    </>
  );

  let readyToGoScreen;
  if (state.credits <= 0 && state.freeplay <= 0) readyToGoScreen = pointsScreen;
  else if (state.freeplay > 0) readyToGoScreen = freeplayScreen;
  else readyToGoScreen = creditsScreen;

  const controlsAndTimerScreen = (
    <>
      <SlideableContent direction="right" show={gameplay}>
        <Controls />
      </SlideableContent>
    </>
  );
  return (
    <section id="controls-section">
      <PointsForCreditsModal closeDrawer={() => setModalIsActive(false)} show={modalIsActive} />
      {letsPlayScreen}
      {readyToGoScreen}
      {controlsAndTimerScreen}
    </section>
  );
};

export default ControlsSection;
