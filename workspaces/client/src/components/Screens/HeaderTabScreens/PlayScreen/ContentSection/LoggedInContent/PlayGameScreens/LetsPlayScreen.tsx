import * as React from 'react';
// import {Buttons} from '../../../Buttons';
import { useGameState } from 'src/state/hooks';
import DepthButton from 'src/components/UIElements/DepthButton/DepthButton';
import SlideableContent from 'src/components/UIElements/SlideableContent/SlideableContent';
import SlotsModal from 'src/components/UIElements/SlotsModal/SlotsModal';

import TitleDescription from 'src/components/UIElements/TitleDescription/TitleDescription';

// import './ControlsSection.scss';

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
      <SlotsModal closeDrawer={() => setModalIsActive(false)} show={modalIsActive} />
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

      {/* <div className="slots">
        <button onClick={() => setModalIsActive(true)}>Slots</button>
      </div> */}
    </SlideableContent>
  );
};

export default LetsPlayScreen;
