import * as React from 'react';

import DepthButton from 'src/components/UIElements/DepthButton/DepthButton';

import { upArrow, downArrow, rightArrow, leftArrow } from './Arrows';

interface Props {
  direction: 'up' | 'down' | 'left' | 'right';
  onButtonDown: () => void;
  onButtonUp: () => void;
}

const ControlButton: React.FC<Props> = (props) => {
  const [arrowDirection, setArrowDirection] = React.useState(upArrow);

  React.useEffect(() => {
    switch (props.direction) {
      case 'up':
        setArrowDirection(upArrow);

        break;
      case 'down':
        setArrowDirection(downArrow);

        break;
      case 'left':
        setArrowDirection(leftArrow);

        break;
      case 'right':
        setArrowDirection(rightArrow);

        break;

      default:
        break;
    }
  }, [props.direction]);
  return (
    <DepthButton
      id={`${props.direction}-btn`}
      buttonText={arrowDirection}
      // type="secondary"
      width={55}
      height={55}
      borderRadius={55}
      color="purple"
      onPointerDown={props.onButtonDown}
      onPointerUp={props.onButtonUp}
    />
  );
};

export default ControlButton;
