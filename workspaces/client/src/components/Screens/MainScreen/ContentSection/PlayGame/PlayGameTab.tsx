import * as React from 'react';

import './PlayGameTab.scss';
import useAuthState from 'src/state/hooks/useAuthState';
import FlatButton from 'src/components/UIElements/FlatButton/FlatButton';
import TitleDescription from './ControlsSection/TitleDescription/TitleDescription';
import ControlsSection from './ControlsSection/ControlsSection';

const PlayGameTab: React.FC = () => {
	const { state, actions } = useAuthState();

	const signInPrompt = (
		<div className="sign-in-prompt">
			<TitleDescription
				title="You must be logged in to play."
				descriptionStart="Please login with your Gmail or Discord account."
			/>
			<FlatButton text="Sign In" width={165} onClick={actions.loginWithPopup} ghost />
		</div>
	);

	const controlsArea = <ControlsSection />;

	return (
		<section id="play-game-tab">
			{
				state.isAuthenticated ? controlsArea :
				signInPrompt}
		</section>
	);
};

export default PlayGameTab;
