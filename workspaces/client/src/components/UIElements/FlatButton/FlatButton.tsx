import * as React from 'react';
import { useAuthState, useGameState } from 'src/state/hooks';
import styles from './FlatButton.module.scss';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface Props {
  onClick?: () => void;
  text: string;
  id?: string;
  disabled?: boolean;
  ghost?: boolean;
  width?: number;
  height?: number;
  shape?: string;
  isLoading?: boolean;
}

const FlatButton: React.FC<Props> = ({ disabled, isLoading, id, onClick, text, width, height, shape, ghost }) => {
  const buttonStyles = {
    width,
    height,
  };

  const clickHandler = () => {
    console.log('Just a test, nothing to see here.');
  };
  return (
    <div id={id} className="flat-button-container">
      <button
        className={ghost ? 'ghost--white' : 'solid'}
        onClick={onClick || clickHandler}
        disabled={disabled}
        onKeyDown={onClick || clickHandler}
        style={buttonStyles}
      >
        {isLoading ? <LoadingSpinner /> : text}
      </button>
    </div>
  );
};

export default FlatButton;
