import * as React from 'react';

import './DepthButton.scss';

import { useAuthState, useGameState } from 'src/state/hooks';
interface Props {
	dataType: string;
	onClick?: () => void;
	onPointerDown?: () => void;
	onPointerUp?: () => void;
	id: string;
	buttonText: string;
	width?: number;
	height?: number;
	color?: string;
	center?: boolean;
	borderRadius?: number;
}

const DepthButton: React.FC<Props> = ({
	dataType,
	buttonText,
	id,
	width,
	height,
	onPointerUp,
	onPointerDown,
	center,
	color,
	borderRadius
}) => {
	const { actions, state } = useGameState();
	const authState = useAuthState();
	const [ buttonIsDown, setButtonIsDown ] = React.useState<boolean>(false);
	const buttonStyles = {
		width: width,
		height: height,
		margin:
			!center ? '0 6px' :
			'0 auto'
	};

	const buttonContentWrapperStyles = {
		borderRadius:
			borderRadius ? borderRadius :
			3
	};
	const shadowStyles = {
		height: height,
		borderRadius:
			borderRadius ? borderRadius :
			3
	};

	const mouseDownHandler = () => {
		// actions.buttonDownEvent();
		setButtonIsDown(true);
		console.log('down');
	};
	const mouseUpHandler = () => {
		// actions.buttonUpEvent();
		setButtonIsDown(false);
		console.log('up');
	};
	return (
		<div
			onMouseDown={mouseDownHandler}
			onMouseUp={mouseUpHandler}
			style={buttonStyles}
			className="depth-button2-container"
		>
			<div style={shadowStyles} className={`shadow ${color}`} />
			<button
				onPointerUp={

						onPointerUp ? onPointerUp :
						actions.buttonUpEvent
				}
				onPointerDown={

						onPointerDown ? onPointerDown :
						actions.buttonDownEvent
				}
				className={buttonIsDown && 'button--down'}
				id={id}
				data-type={dataType}
			>
				<div style={buttonContentWrapperStyles} className={`button__content-wrapper ${color}`}>
					{buttonText}
				</div>
			</button>
		</div>
	);
};

export default DepthButton;
