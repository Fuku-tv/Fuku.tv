import * as React from 'react';
// import {Buttons} from '../../../Buttons';
import { useGameState } from 'src/state/hooks';
import DepthButton from 'src/components/UIElements/DepthButton/DepthButton';
import SlideableContent from 'src/components/UIElements/SlideableContent/SlideableContent';
import Controls from './Controls/Controls';
import PlayGameButton from './PlayGameButton/PlayGameButton';
import TitleDescription from './TitleDescription/TitleDescription';
import StopGameButton from './StopGameButton/StopGameButton';
import StartGameButton from './StartGameButton/StartGameButton';
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
      <DepthButton buttonSizeLarge id="btnStop" dataType="stop" buttonText="End Game" type="secondary" height={50} />
      <DepthButton buttonSizeLarge id="btnStart" dataType="start" buttonText="Start Round" width={160} height={50} />
    </div>
  );

  const letsPlayscreen = (
    <SlideableContent direction="left" show={!controlsVisible}>
      <div className="play-game-button-container">
        <TitleDescription
          title="Let's Play Fuku"
          descriptionStart="You currently have"
          dynamicNumber={state.queue}
          descriptionEnd="players in front of you."
        />
        <DepthButton buttonSizeLarge id="btnPlay" dataType="join" buttonText="Enter Player Queue" width={200} height={50} />
      </div>
    </SlideableContent>
  );

  const readyToGoscreen = (
    <>
      <SlideableContent direction={gameplay ? 'left' : 'right'} show={controlsVisible && !gameplay}>
        <TitleDescription title="Ready To Go?" descriptionStart="You currently have" dynamicNumber={state.credits} descriptionEnd="credits left." />{' '}
        {startGameStopGameBtns}
      </SlideableContent>
    </>
  );

  const controlsAndTimerscreen = (
    <>
      <SlideableContent direction="right" show={gameplay}>
        <Timer />
        <Controls />
      </SlideableContent>
    </>
  );
  return (
    <section id="controls-section">
      {letsPlayscreen}
      {readyToGoscreen}
      {controlsAndTimerscreen}
    </section>
  );
};

export default ControlsSection;
