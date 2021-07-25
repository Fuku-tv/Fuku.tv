import * as React from 'react';

import './LeaderboardsScreen.scss';
import useAuthState from 'src/state/hooks/useAuthState';
import ProfileImage from 'src/components/UIElements/ProfileImage/ProfileImage';
import Screen from 'src/components/UIElements/Screen/Screen';
import LeaderboardRow from './LeaderboardRow';
import LeaderboardPodium from './LeaderboardPodium/LeaderboardPodium';

const SAMPLE_LEADERBOARD_DATA = [
  {
    userName: 'Creed',
    userScore: '15',
  },
  {
    userName: 'Michael',
    userScore: '9',
  },
  {
    userName: 'Dwight',
    userScore: '7',
  },
  {
    userName: 'Jim',
    userScore: '6',
  },
  {
    userName: 'Angela',
    userScore: '5',
  },
  {
    userName: 'Stanley',
    userScore: '4',
  },
  {
    userName: 'Michael',
    userScore: '9',
  },
  {
    userName: 'Dwight',
    userScore: '7',
  },
  {
    userName: 'Jim',
    userScore: '6',
  },
  {
    userName: 'Angela',
    userScore: '5',
  },
];

const LeaderboardsScreen: React.FC = () => {
  const { state, actions } = useAuthState();

  const comingSoonScreen = (
    <Screen id="leaderboards" title="Leaderboards">
      <div className="table leaderboards-table">Fuku leaderboards coming soon!</div>
    </Screen>
  );

  React.useEffect(() => {
    const getL = async () => {
      const playerIdList = SAMPLE_LEADERBOARD_DATA;
      console.log('p-----------', playerIdList);
    };
    try {
      getL();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const content = (
    <Screen id="leaderboards" title="Leaderboards">
      <div className="leaderboard-screen-content-wrapper">
        <div className="table leaderboards-table">
          <div id="leaderboard__header" className="leaderboard-row">
            <div className="header__rank">Rank</div>
            <div className="header__user">Username</div>
            <div className="header__score">Score</div>
            <div className="header__wins">Wins</div>
          </div>
          {SAMPLE_LEADERBOARD_DATA.map((u, i) => (
            <LeaderboardRow key={Math.random()} imgURL="asd" rank={i} name={u.userName} score={u.userScore} />
          ))}
        </div>
        <LeaderboardPodium first="Jimmy Oliva" second="AJ Oliva" third="Fred" />
      </div>
    </Screen>
  );

  return comingSoonScreen;
};

export default LeaderboardsScreen;
