import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import { IconButton } from '@chakra-ui/react';
import CameraSwapIcon from 'src/components/icons/CameraSwapIcon';

const SwitchCameraButton: React.FC = () => {
  const { actions } = useGameState();

  return (
    <IconButton
      borderRadius="0 6px 0 0"
      color="white"
      height="56px"
      width="60px"
      _focus={{ outline: 'none' }}
      _hover={{ background: '#7a61a1' }}
      variant="link"
      icon={<CameraSwapIcon />}
      aria-label="swap camera"
      onPointerDown={() => actions.buttonDownEvent('swapvideo')}
    />
  );
};

export default SwitchCameraButton;
