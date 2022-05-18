/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { IconButtonProps } from '@chakra-ui/react';
import { forwardRef, IconButton } from '@chakra-ui/react';
import CameraSwapIcon from '../icons/CameraSwapIcon';

const SwitchCameraButton = forwardRef<Omit<IconButtonProps, 'aria-label'>, typeof IconButton>((props, ref) => (
  <IconButton
    borderRadius="full"
    color="white"
    height="60px"
    width="60px"
    _focus={{ outline: 'none' }}
    _hover={{ background: '#7a61a1' }}
    variant="link"
    icon={<CameraSwapIcon />}
    aria-label="swap camera"
    onPointerDown={props.onPointerDown}
    {...props}
  />
));

export default SwitchCameraButton;
