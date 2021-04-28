import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import * as styles from './PlayerLevel.module.scss';
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
          setPointPercent((points / levels[i].max) * 100);
          break;
        }
        // break;
      }
    };
    getPlayerLevel(gameState.state.points);
  }, [gameState.state.points]);

  // const lvlProgress = (
  //   <div className="level__progress">
  //     {gameState.state.points}/{maxPoints}
  //   </div>
  // );
  return (
    <div className={styles.CircularProgressbar}>
      <CircularProgressbar
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          strokeLinecap: 'butt',
          textSize: '44px',
          fontWeight: 'bold',
          pathTransitionDuration: 0.5,
          textColor: '#fff',
          trailColor: '#c4b9d7',
          pathColor: '#f9bf00',
        })}
        value={gameState.state.points === 0 ? 1 : playerLevel}
        text={playerLevel}
      />
    </div>
  );
};

export default PlayerLevel;
