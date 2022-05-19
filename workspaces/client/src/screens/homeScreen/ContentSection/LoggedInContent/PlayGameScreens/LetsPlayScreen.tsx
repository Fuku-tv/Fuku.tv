import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import DepthButton from 'src/components/UIElements/DepthButton/DepthButton';
import SlideableContent from 'src/components/UIElements/SlideableContent/SlideableContent';

import { Box } from '@chakra-ui/react';
import TitleDescription from 'src/components/UIElements/TitleDescription/TitleDescription';

// import './ControlsSection.scss';

interface Props {
  gameStatus: string;
}

const LetsPlayScreen: React.FC<Props> = ({ gameStatus }) => {
  // const old = <Buttons/>;
  const { state, actions } = useGameState();

  return (
    <SlideableContent direction="left" show={gameStatus !== 'controlsVisible'}>
      <Box>
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
      </Box>
    </SlideableContent>
  );
};

export default LetsPlayScreen;
