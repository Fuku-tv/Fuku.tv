import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import './PlayerLevel.scss';
import { levels } from './playerLevels';

const PlayerLevel: React.FC = () => {
  const gameState = useGameState();
  const [playerLevel, setPlayerLevel] = React.useState(0);
  const [maxPoints, setMaxPoints] = React.useState(0);
  const [pointPercent, setPointPercent] = React.useState(0);

  React.useEffect(() => {
    const getPlayerLevel = (points) => {
      for (let i = 0; i < levels.length; i += 1) {
        const isBetween = (n, lower, upper) => n >= lower && n <= upper;
        // letisBetween(p, l.min, l.max);
        if (isBetween(points, levels[i].min, levels[i].max)) {
          console.log('Current Level: ', levels[i].level);
          setPlayerLevel(levels[i].level);
          // setPointsUntilNextLevel(levels[i].max - p)
          setMaxPoints(levels[i].max);
          setPointPercent((p / levels[i].max) * 100);
          break;
        }
        // break;
      }
    };
    getPlayerLevel(gameState.state.points);
  }, [gameState.state.points]);

  return (
    <div id="level">
      <div className="stat-item-wrapper">
        <span className="player-stats__item">Level:</span>
        <span className="player-stats__value">{playerLevel}</span>
      </div>
      <progress min="0" max="100" value={pointPercent} />
      <span className="player-stats__item">
        {gameState.state.points}/{maxPoints}
      </span>
    </div>
  );
};

export default PlayerLevel;
