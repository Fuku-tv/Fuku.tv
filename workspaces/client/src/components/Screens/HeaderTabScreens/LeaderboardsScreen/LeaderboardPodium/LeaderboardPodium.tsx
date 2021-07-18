import * as React from 'react';
import ProfileImage from 'src/components/UIElements/ProfileImage/ProfileImage';

import './LeaderboardPodium.scss';

interface PROPS {
  first?: string;
  second?: string;
  third?: string;
}

const LeaderboardPodium: React.FC<PROPS> = ({ first, second, third }) => (
  <div id="leaderboards-podium">
    <PodiumItem position="second" positionNumber="2" name={second} wins="115" />
    <PodiumItem position="first" positionNumber="1" name={first} wins="140" />
    <PodiumItem position="third" positionNumber="3" name={third} wins="111" />
  </div>
);
const PodiumItem = (props) => (
  <div className={`podium-column ${props.position}`}>
    <div className="podium-name">{props.name}</div>
    <div className="place-number">{props.positionNumber}</div>
    <div className="wins-number">{props.wins} Wins</div>
  </div>
);

export default LeaderboardPodium;
