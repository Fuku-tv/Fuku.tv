import * as React from 'react';

import './LeaderboardsScreen.scss';
import useAuthState from 'src/state/hooks/useAuthState';
import ProfileImage from 'src/components/UIElements/ProfileImage/ProfileImage';
import Screen from 'src/components/UIElements/Screen/Screen';
import useLeaderboardState from 'src/state/hooks/useLeaderboardState';
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
  const { state, actions } = useLeaderboardState();

  React.useEffect(() => {
    try {
      actions.getLeaderboard();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen id="leaderboards" title="Leaderboards">
      <div className="leaderboard-screen-content-wrapper">
        <div className="table leaderboards-table">
          <div id="leaderboard__header" className="leaderboard-row">
            <div className="header__rank">Rank</div>
            <div className="header__user">Username</div>
            <div className="header__score">Score</div>
          </div>
          {state.playerList.slice(0, 10).map((u, i) => (
            <LeaderboardRow key={Math.random()} imgURL="asd" rank={i} name={u.nickname} score={u.points} />
          ))}
        </div>
        <LeaderboardPodium first={state.playerList[0]?.nickname} second={state.playerList[1]?.nickname} third={state.playerList[2]?.nickname} />
      </div>
    </Screen>
  );
};

export default LeaderboardsScreen;
