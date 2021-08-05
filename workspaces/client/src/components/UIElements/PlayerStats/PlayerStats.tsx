import * as React from 'react';
import './PlayerStats.scss';
import { useAuthState, useGameState } from 'src/state/hooks';

import { CSSTransition } from 'react-transition-group';

const PlayerStats: React.FC = () => {
  const { state, actions } = useGameState();
  const authState = useAuthState();
  return (
    <div className={`player-stats-container `}>
      <div id="points" className="user-info-item">
        <span className="user-info-item__title">My Points</span>
        <span className="user-info-item__value">{state.points}</span>
      </div>
      <div className="game-plays-container">
        <div id="credits" className="user-info-item">
          <span className="user-info-item__title">Credits:</span>
          <span className="user-info-item__value">{state.credits}</span>
        </div>
        <div id="freeplay-credits" className="user-info-item">
          <span className="user-info-item__title">Freeplay:</span>
          <span className="user-info-item__value">{state.freeplay}</span>
        </div>
      </div>
    </div>
  );
};
export default PlayerStats;
