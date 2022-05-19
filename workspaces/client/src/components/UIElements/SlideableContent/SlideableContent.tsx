import * as React from 'react';
import './SlideableContent.scss';
import { CSSTransition } from 'react-transition-group';
import { Box } from '@chakra-ui/react';

interface Props {
  direction: string;
  show: boolean;
  children: React.ReactNode;
}

const directions = {
  up: 'down_to_up',
  down: 'up_to_down',
  right: 'left_to_right',
  left: 'right_to_left',
  dropClawButton: 'drop_claw_button',
  dropClawExit: 'drop_claw_button_exit',
};

const SlideableContent: React.FC<Props> = (props) => (
  <CSSTransition in={props.show} timeout={500} classNames={directions[props.direction]} mountOnEnter unmountOnExit>
    <Box width="100%" minHeight="128px" className="slideable-content-container">
      {props.children}
    </Box>
  </CSSTransition>
);
export default SlideableContent;
