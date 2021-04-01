import * as React from 'react';
// import {Buttons} from '../../../Buttons';
import { useGameState } from 'src/state/hooks';
import DepthButton from 'src/components/UIElements/DepthButton/DepthButton';
import SlideableContent from 'src/components/UIElements/SlideableContent/SlideableContent';
import Controls from './Controls/Controls';
import TitleDescription from '../../../../../UIElements/TitleDescription/TitleDescription';
import './ControlsSection.scss';
import Timer from './Timer/Timer';

const ControlsSection: React.FC = () => {
  // const old = <Buttons/>;
  const { state, actions } = useGameState();
  const controlsVisible = state.gameStatus === 'gamestandby' || state.gameStatus === 'gameplay';
  const gamestandby = state.gameStatus === 'gamestandby';
  const gameplay = state.gameStatus === 'gameplay';

  const startGameStopGameBtns = (
    <div id="start" className="start-stop-buttons-container">
      <DepthButton
        onPointerUp={actions.buttonUpEvent}
        onPointerDown={actions.buttonDownEvent}
        id="btnStop"
        dataType="stop"
        buttonText="End Game"
        width={110}
        height={42}
        color="red"
      />

      <DepthButton
        onPointerUp={actions.buttonUpEvent}
        onPointerDown={actions.buttonDownEvent}
        id="btnStart"
        dataType="start"
        buttonText="Start Round"
        width={160}
        height={42}
        color="purple"
      />
    </div>
  );

  const letsPlayScreen = (
    <SlideableContent direction="left" show={!controlsVisible && state.queue === 0}>
      <div className="play-game-button-container">
        <TitleDescription
          title="Let's Play Fuku"
          descriptionStart="You currently have"
          dynamicNumber={state.queue}
          descriptionEnd="players in front of you."
        />

        <DepthButton
          onPointerDown={actions.buttonDownEvent}
          onPointerUp={actions.buttonUpEvent}
          id="btnPlay"
          dataType="join"
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

  const creditsScreen = (
    <>
      <SlideableContent direction={gameplay ? 'left' : 'right'} show={controlsVisible && !gameplay}>
        <TitleDescription title="Ready to Play?" descriptionStart="You have" dynamicNumber={state.credits} descriptionEnd="credits left!" />{' '}
        {startGameStopGameBtns}
      </SlideableContent>
    </>
  );

  let readyToGoScreen;
  if (state.freeplay > 0) readyToGoScreen = freeplayScreen;
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
      {letsPlayScreen}
      {readyToGoScreen}
      {controlsAndTimerScreen}
    </section>
  );
};

export default ControlsSection;
