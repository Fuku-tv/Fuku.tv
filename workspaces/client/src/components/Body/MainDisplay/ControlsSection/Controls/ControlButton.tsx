import * as React from 'react';
import { AwesomeButton } from 'react-awesome-button';

import { upArrow, downArrow, rightArrow, leftArrow } from './Arrows';

interface Props {
  type: 'up' | 'down' | 'left' | 'right';
  direction: 'up' | 'down' | 'left' | 'right';
  onButtonDown: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onButtonUp: (event: React.PointerEvent<HTMLButtonElement>) => void;
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
    <button onPointerDown={props.onButtonDown} onPointerUp={props.onButtonUp} className="control-button-wrapper" data-type={props.type}>
      <AwesomeButton type="primary">{arrowDirection}</AwesomeButton>
    </button>
  );
};

export default ControlButton;
