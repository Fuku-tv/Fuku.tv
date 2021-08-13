import * as React from 'react';
import ReactDOM from 'react-dom';
import Portal from '../Portal';

import './Backdrop.scss';

interface Props {
  onClick?: () => void;
}
const Backdrop: React.FC<Props> = ({ onClick }) => {
  const content = <div className="backdrop" onClick={onClick} onKeyDown={onClick} aria-label="backdrop" role="button" tabIndex={0} />;

  return <Portal id="backdrop-hook">{content}</Portal>;
};

export default Backdrop;
