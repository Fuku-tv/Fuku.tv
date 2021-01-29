import * as React from 'react';
import VideoFeed from 'src/components/game/VideoFeed';
import SwitchCameraButton from './SwitchCameraButton/SwitchCameraButton';
import './VideoFeedSection.scss';
import SpectatorInformation from './SpectatorInformation/SpectatorInformation';

const VideoFeedSection: React.FC = () => {
	return (
		<section id="video-feed-section">
			<SwitchCameraButton />
			<SpectatorInformation />
			<VideoFeed width="100%" height="480" />
		</section>
	);
};

export default VideoFeedSection;
