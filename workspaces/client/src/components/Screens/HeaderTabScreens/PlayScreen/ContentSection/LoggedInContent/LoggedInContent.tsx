import * as React from 'react';
// import {Buttons} from '../../../Buttons';
import { useGameState } from 'src/state/hooks';

import './LoggedInContent.scss';

import LetsPlayScreen from './PlayGameScreens/LetsPlayScreen';
import ReadyToGoScreen from './PlayGameScreens/ReadyToGoScreen';
import CurrentlyPlayingScreen from './PlayGameScreens/CurrentlyPlayingScreen';

const LoggedInContent: React.FC = () => {
  // const old = <Buttons/>;
  const { state, actions } = useGameState();
  const [gameStatus, setGameStatus] = React.useState<string>('gamestandby');

  React.useEffect(() => {
    if (state.gameStatus === 'gamestandby' || state.gameStatus === 'gameplay') {
      setGameStatus('controlsVisible');
      return;
    }

    if (state.gameStatus === 'gamestandby') {
      setGameStatus('gamestandby');
      return;
    }

    if (state.gameStatus === 'gameplay') {
      setGameStatus('gameplay');
      return;
    }

    setGameStatus('gamestandby');
  }, [state.gameStatus]);

  return (
    <section id="controls-section">
      <LetsPlayScreen gameStatus="controlsVisible" />
      <ReadyToGoScreen gameStatus={gameStatus} />
      <CurrentlyPlayingScreen gameStatus={gameStatus} />
    </section>
  );
};

export default LoggedInContent;
