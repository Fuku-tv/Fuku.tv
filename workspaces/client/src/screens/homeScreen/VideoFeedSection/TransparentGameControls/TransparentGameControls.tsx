import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import Timer from 'src/components/game/Timer/Timer';
import SlideableContent from 'src/components/UIElements/SlideableContent/SlideableContent';

import SwitchCameraButton from 'src/components/elements/SwitchCameraButton';
import { Box, Flex } from '@chakra-ui/react';
import DropClawButton from '../../ContentSection/LoggedInContent/GameComponents/DropClawButton/DropClawButton';
import ControlButton from '../../ContentSection/LoggedInContent/GameComponents/Controls/ControlButton';

import './TransparentGameControls.scss';

const TransparentGameControls: React.FC = () => {
  const { state, actions } = useGameState();
  const gameplay = state.gameStatus === 'gameplay';

  const forwardContolBtns = (
    <>
      <ControlButton
        color="transparent"
        onButtonDown={() => actions.buttonDownEvent('up')}
        onButtonUp={() => actions.buttonUpEvent('up')}
        direction="up"
      />
      <div className="left-right-row">
        <ControlButton
          color="transparent"
          onButtonDown={() => actions.buttonDownEvent('left')}
          onButtonUp={() => actions.buttonUpEvent('left')}
          direction="left"
        />
        <ControlButton
          color="transparent"
          onButtonDown={() => actions.buttonDownEvent('right')}
          onButtonUp={() => actions.buttonUpEvent('right')}
          direction="right"
        />
      </div>
      <ControlButton
        color="transparent"
        onButtonDown={() => actions.buttonDownEvent('down')}
        onButtonUp={() => actions.buttonUpEvent('down')}
        direction="down"
      />
    </>
  );
  const sideContolBtns = (
    <>
      <ControlButton
        color="transparent"
        onButtonDown={() => actions.buttonDownEvent('left')}
        onButtonUp={() => actions.buttonUpEvent('left')}
        direction="up"
      />
      <div className="left-right-row">
        <ControlButton
          color="transparent"
          onButtonDown={() => actions.buttonDownEvent('down')}
          onButtonUp={() => actions.buttonUpEvent('down')}
          direction="left"
        />
        <ControlButton
          color="transparent"
          onButtonDown={() => actions.buttonDownEvent('up')}
          onButtonUp={() => actions.buttonUpEvent('up')}
          direction="right"
        />
      </div>
      <ControlButton
        color="transparent"
        onButtonDown={() => actions.buttonDownEvent('right')}
        onButtonUp={() => actions.buttonUpEvent('right')}
        direction="down"
      />
    </>
  );

  return (
    <SlideableContent direction={!gameplay ? 'up' : 'down'} show={gameplay}>
      <Box paddingX={{ base: 0, md: '10px' }}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          padding={{ base: 0, md: '10px 3rem' }}
          position="relative"
          className="content-wrapper"
        >
          <Timer />
          <DropClawButton />

          <div className="button-controls-container">{state.cameraIsForward ? forwardContolBtns : sideContolBtns}</div>
          <SwitchCameraButton borderRadius="full" onPointerDown={() => actions.buttonDownEvent('swapvideo')} />
        </Flex>
      </Box>
    </SlideableContent>
  );
};

export default TransparentGameControls;
