import * as React from 'react';
// import {Buttons} from '../../../Buttons';
import { useGameState } from 'src/state/hooks';
import Controls from './Controls/Controls';
import TitleDescription from './TitleDescription/TitleDescription';
import DepthButton from 'src/shared/components/UIElements/DepthButton/DepthButton';
import SlideableContent from '../../../../../../shared/components/UIElements/SlideableContent/SlideableContent';
import './ControlsSection.scss';
import Timer from './Timer/Timer';

const ControlsSection: React.FC<Props> = () => {
	// const old = <Buttons/>;
	const { state, actions } = useGameState();
	const controlsVisible = state.gameStatus === 'gamestandby' || state.gameStatus === 'gameplay';
	const gamestandby = state.gameStatus === 'gamestandby';
	const gameplay = state.gameStatus === 'gameplay';

	const startGameStopGameBtns = (
		<div id="start" className="start-stop-buttons-container">
			<DepthButton id="btnStop" dataType="stop" buttonText="End Game" width={110} height={42} color="red" />
			<DepthButton
				id="btnStart"
				dataType="start"
				buttonText="Start Round"
				width={160}
				height={42}
				color="purple"
			/>
		</div>
	);

	const letsPlay__screen = (
		<SlideableContent direction="left" show={!controlsVisible && state.queue === 0}>
			<div className="play-game-button-container">
				<TitleDescription
					title="Let's Play Fuku"
					descriptionStart="You currently have"
					dynamicNumber={state.queue}
					descriptionEnd="players in front of you."
				/>

				<DepthButton
					id="btnPlay"
					dataType="join"
					buttonText="Enter Player Queue"
					width={200}
					height={42}
					color="purple"
					center
				/>
			</div>
		</SlideableContent>
	);

	let readyToGo__screen = (
		<React.Fragment>
			<SlideableContent
				direction={

						gameplay ? 'left' :
						'right'
				}
				show={controlsVisible && !gameplay}
			>
				<TitleDescription
					title="Ready To Go?"
					descriptionStart="You currently have"
					dynamicNumber={state.credits}
					descriptionEnd="credits left."
				/>{' '}
				{startGameStopGameBtns}
			</SlideableContent>
		</React.Fragment>
	);

	let controlsAndTimer__screen = (
		<React.Fragment>
			<SlideableContent direction="right" show={gameplay}>
				<Timer />
				<Controls />
			</SlideableContent>
		</React.Fragment>
	);
	return (
		<section id="controls-section">
			{letsPlay__screen}
			{readyToGo__screen}
			{controlsAndTimer__screen}
		</section>
	);
};

export default ControlsSection;
