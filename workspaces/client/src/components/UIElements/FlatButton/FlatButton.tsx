import * as React from 'react';
import './FlatButton.scss';

import { useAuthState, useGameState } from 'src/state/hooks';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface Props {
  onClick?: () => void;
  text: string;
  id?: string;
  ghost?: boolean;
  width?: number;
  height?: number;
  shape?: string;
  isLoading?: boolean;
}

const FlatButton: React.FC<Props> = ({ isLoading, id, onClick, text, width, height, shape, ghost }) => {
  const buttonStyles = {
    width,
    height,
  };

  const clickHandler = () => {
    console.log('Just a test, nothing to see here.');
  };
  return (
    <div id={id} className="flat-button-container">
      <button className={ghost ? 'ghost' : 'solid'} onClick={onClick || clickHandler} onKeyDown={onClick || clickHandler} style={buttonStyles}>
        {isLoading ? <LoadingSpinner /> : text}
      </button>
    </div>
  );
};

export default FlatButton;
