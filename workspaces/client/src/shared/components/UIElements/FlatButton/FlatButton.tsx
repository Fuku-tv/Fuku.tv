import * as React from 'react';
import './FlatButton.scss';

import { useAuthState, useGameState } from 'src/state/hooks';
interface Props {
	onClick: () => void;
	text: string;
	id?: string;
	ghost?: boolean;
	width?: number;
	height?: number;
	shape?: string;
}

const FlatButton: React.FC<Props> = ({ id, onClick, text, width, height, shape, ghost }) => {
	const buttonStyles = {
		width: width,
		height: height
	};
	return (
		<div className="flat-button-container">
			<button
				className={

						ghost ? 'ghost' :
						'solid'
				}
				onClick={onClick}
				style={buttonStyles}
			>
				{text}
			</button>
		</div>
	);
};

export default FlatButton;
