import * as React from 'react';
import ReactDOM from 'react-dom';

import styles from './Backdrop.module.scss';

interface Props {
  onClick?: () => void;
}
const Backdrop: React.FC<Props> = ({ onClick }) => {
  const content = <div className={styles.backdrop} onClick={onClick} onKeyDown={onClick} aria-label="backdrop" role="button" tabIndex={0} />;

  return ReactDOM.createPortal(content, document.getElementById('backdrop-hook'));
};

export default Backdrop;
