import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import TransparentGameControls from '../../VideoFeedSection/TransparentGameControls/TransparentGameControls';

import LetsPlayScreen from './PlayGameScreens/LetsPlayScreen';
import ReadyToGoScreen from './PlayGameScreens/ReadyToGoScreen';

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
    <>
      <LetsPlayScreen gameStatus={gameStatus} />
      <ReadyToGoScreen gameStatus={gameStatus} />
      <TransparentGameControls />
      {/* <CurrentlyPlayingScreen gameStatus={gameStatus} /> */}
    </>
  );
};

export default LoggedInContent;
