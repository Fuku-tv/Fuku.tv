import * as React from 'react';
import './SlideableContent.scss';
import {CSSTransition} from 'react-transition-group';
interface Props {
  direction : string;
  show : boolean;
  onCancel?: () => void;
}

const SlideableContent : React.FC < Props > = (props) => {
  return (
    <React.Fragment>
      <CSSTransition
        in={props.show}
        timeout={500}
        classNames={props.direction === 'right'
        ? 'left_to_right'
        : 'right_to_left'}
        mountOnEnter
        unmountOnExit>
        <div className="slideable-content-container">{props.children}</div>
      </CSSTransition>
    </React.Fragment>
  );
};

export default SlideableContent;
