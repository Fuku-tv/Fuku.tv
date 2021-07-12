import * as React from 'react';
// import {Buttons} from '../../../Buttons';
import { useGameState } from 'src/state/hooks';
import DepthButton from 'src/components/UIElements/DepthButton/DepthButton';
import SlideableContent from 'src/components/UIElements/SlideableContent/SlideableContent';
import PointsForCreditsModal from 'src/components/UIElements/PointsForCreditsModal/PointsForCreditsModal';
import TitleDescription from 'src/components/UIElements/TitleDescription/TitleDescription';
import Controls from './Controls/Controls';

// import './ControlsSection.scss';
import Timer from './Timer/Timer';

interface PROPS {
  gameStatus: string;
}

const LetsPlayScreen: React.FC<PROPS> = ({ gameStatus }) => {
  // const old = <Buttons/>;
  const { state, actions } = useGameState();
  const [modalIsActive, setModalIsActive] = React.useState<boolean>(false);
  const controlsVisible = state.gameStatus === 'gamestandby' || state.gameStatus === 'gameplay';
  const gamestandby = state.gameStatus === 'gamestandby';
  const gameplay = state.gameStatus === 'gameplay';

  return (
    <SlideableContent direction="left" show={gameStatus !== 'controlsVisible'}>
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
};

export default LetsPlayScreen;
