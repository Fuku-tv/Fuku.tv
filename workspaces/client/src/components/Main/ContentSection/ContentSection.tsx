import * as React from 'react';
import { useAuthState, useGameState } from 'src/state/hooks';
import useNavigationState from 'src/state/hooks/useNavigationState';

import PlayGameTab from './Tabs/PlayGame/PlayGameTab';
import PrizesTab from './Tabs/PrizesTab/PrizesTab';
import Store from './Tabs/Store/Store';
import Leaderboards from './Tabs/Leaderboards/Leaderboards';
import UserProfile from './Tabs/UserProfile/UserProfile';
import Controls from './Tabs/PlayGame/ControlsSection/Controls/Controls';
import './ContentSection.scss';

const ContentSection: React.FC = () => {
	const { actions, state } = useGameState();
	const authState = useAuthState();
	const navState = useNavigationState();
	const [ cameraIsFront, setCameraIsFront ] = React.useState<boolean>(true);
	const cameraToggleHandler = () => {
		setCameraIsFront((prev) => !prev);
		console.log('change');
	};

	// const visible =
	// 	(state.gameStatus === 'init' || state.gameStatus === 'gameplayend' || state.gameStatus === 'gameend') &&
	// 	authState.state.isAuthenticated;

	const mainContentArea = (
		<React.Fragment>
			{navState.state.tab === 'Play' && <PlayGameTab />}
			{navState.state.tab === 'Leaderboard' && <Leaderboards />}
			{navState.state.tab === 'Store' && <Store />}
			{navState.state.tab === 'Prizes' && <PrizesTab />}
			{navState.state.tab === 'Profile' && <UserProfile />}
		</React.Fragment>
	);

	return (
		<section id="content-section">
			<div className="inner-wrapper">{mainContentArea}</div>
		</section>
	);
};

export default ContentSection;
