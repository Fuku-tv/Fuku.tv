import * as React from 'react';

import { useGameState } from 'src/state/hooks';
import './PlayerQueueSection.scss';

const PlayerQueueSection: React.FC = () => {
  // const old = <Buttons/>;
  const { state, actions } = useGameState();
  const visible = state.gameStatus === 'gamestandby' || state.gameStatus === 'gameplay';
  const gamestandby = state.gameStatus === 'gamestandby';
  const gameplay = state.gameStatus === 'gameplay';
  return (
    <section id="player-queue-section">
      <h3>Player Queue: {state.queue}</h3>
    </section>
  );
};

export default PlayerQueueSection;
