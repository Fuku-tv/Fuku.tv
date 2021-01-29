import * as React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import DepthButton2 from 'src/shared/components/UIElements/DepthButton2/DepthButton2';
import DepthButton from 'src/shared/components/UIElements/DepthButton2/DepthButton2';
import { upArrow, downArrow, rightArrow, leftArrow } from './Arrows';

interface Props {
	type: 'up' | 'down' | 'left' | 'right';
	direction: 'up' | 'down' | 'left' | 'right';
	onButtonDown: (event: React.PointerEvent<HTMLButtonElement>) => void;
	onButtonUp: (event: React.PointerEvent<HTMLButtonElement>) => void;
}

const ControlButton: React.FC<Props> = (props) => {
	const [ arrowDirection, setArrowDirection ] = React.useState(upArrow);

	React.useEffect(
		() => {
			switch (props.direction) {
				case 'up':
					setArrowDirection(upArrow);

					break;
				case 'down':
					setArrowDirection(downArrow);

					break;
				case 'left':
					setArrowDirection(leftArrow);

					break;
				case 'right':
					setArrowDirection(rightArrow);

					break;

				default:
					break;
			}
		},
		[ props.direction ]
	);
	return (
		<DepthButton2
			id="btn"
			dataType={props.type}
			buttonText={arrowDirection}
			type="secondary"
			width={55}
			height={55}
			borderRadius={55}
			color="red"
			onPointerDown={props.onButtonDown}
			onPointerUp={props.onButtonUp}
		/>
	);
};

export default ControlButton;
{
	/* <button onPointerDown={props.onButtonDown} onPointerUp={props.onButtonUp} className="control-button-wrapper" data-type={props.type}>
<AwesomeButton type="primary">{arrowDirection}</AwesomeButton>
</button> */
}
