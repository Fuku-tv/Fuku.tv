import * as React from 'react';

import './LeaderboardsScreen.scss';
import useAuthState from 'src/state/hooks/useAuthState';
import ProfileImage from 'src/components/UIElements/ProfileImage/ProfileImage';

const LeaderboardsScreen: React.FC = () => {
	const { state, actions } = useAuthState();

	const SAMPLE_LEADERBOARD_DATA = [
		{
			userName: 'Creed',
			userScore: '15'
		},
		{
			userName: 'Michael',
			userScore: '9'
		},
		{
			userName: 'Dwight',
			userScore: '7'
		},
		{
			userName: 'Jim',
			userScore: '6'
		},
		{
			userName: 'Angela',
			userScore: '5'
		},
		{
			userName: 'Stanley',
			userScore: '4'
		},
		{
			userName: 'Andy',
			userScore: '4'
		}
	];

	return (
		<section id="leaderboards-section">
			<div className="table leaderboards-table">
				{SAMPLE_LEADERBOARD_DATA.map((u, i) => (
					<LeaderboardUser position={i} name={u.userName} score={u.userScore} />
				))}
			</div>
		</section>
	);
};

export default LeaderboardsScreen;

const LeaderboardUser = (props) => {
	return (
		<div id="leaderboard-user">
			<div className="leaderboard__position">{props.position + 1}</div>
			<div className="leaderboard__user-details">
				<div className="user__image">
					<ProfileImage size={32} />
				</div>
				<div className="user__name">{props.name}</div>
				<div className="user__score">{props.score} Wins</div>
			</div>
		</div>
	);
};
