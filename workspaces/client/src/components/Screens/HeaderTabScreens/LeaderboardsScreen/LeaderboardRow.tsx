import * as React from 'react';
import ProfileImage from 'src/components/UIElements/ProfileImage/ProfileImage';

// import './LeaderboardRow.scss';

interface PROPS {
  rank: number;
  name: string;
  score: string;
  imgURL: string;
}

const LeaderboardRow: React.FC<PROPS> = ({ rank, name, score, imgURL }) => (
  <div className="leaderboard-item leaderboard-row">
    <div className="leaderboard-row__rank">
      <div className="rank">{rank + 1} </div>
      <div className="user__image">
        <ProfileImage image={imgURL} size={32} />
      </div>
    </div>
    <div className="leaderboard-row__user">{name}</div>
    <div className="leaderboard-row__points">1508</div>
    <div className="leaderboard-row__score">{score} Wins</div>
  </div>
);

export default LeaderboardRow;
