import * as React from 'react';

import { isMobile } from 'react-device-detect';
import { NavLink } from 'react-router-dom';
import { Squash as Hamburger } from 'hamburger-react';
import useAuthState from 'src/state/hooks/useAuthState';
import FlatButton from 'src/components/UIElements/FlatButton/FlatButton';
import { useGameState } from 'src/state/hooks';

import ProfileImage from 'src/components/UIElements/ProfileImage/ProfileImage';

import './NotificationsDropdown.scss';
interface PROPS {
	id: string;
	children?: any;
}

const NotificationDropdown: React.FC<PROPS> = (props) => {
	const { state, actions } = useAuthState();
	const gameState = useGameState();
	// testing const [modalIsActive, 		setModalIsActive] = React.useState < boolean
	// > (false);

	const [ dropdownIsOpen, setDropdownIsOpen ] = React.useState<boolean>(false);

	// const modalTestHandler = () => { 		setModalIsActive((prev) => !prev); };

	const linksDropdown = (
		<div className="dropdown-container__links">
			<ul>
				<li>
					<NavLink activeClassName="nav-link__active" to="/profile" exact>
						<div className="dropdown-icon-wrapper">Notification</div>
						<span>Profile</span>
					</NavLink>
				</li>
			</ul>
		</div>
	);

	const buttonStyles = {
		background:
			dropdownIsOpen ? 'var(--purpleSecondary)' :
			'inherit'
	};

	return (
		<div style={buttonStyles} id={props.id} className="dropdown-button-container">
			<div onClick={() => setDropdownIsOpen((state) => !state)} className="header-profile-wrapper ">
				<div className="down-arrow-wrapper">{bellIcon}</div>
			</div>
			{dropdownIsOpen && linksDropdown}
		</div>
	);
};

export default NotificationDropdown;
const bellIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		focusable="false"
		data-prefix="far"
		data-icon="bell"
		className="svg-inline--fa fa-bell fa-w-14"
		role="img"
		viewBox="0 0 448 512"
	>
		<path
			fill="currentColor"
			d="M439.39 362.29c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71zM67.53 368c21.22-27.97 44.42-74.33 44.53-159.42 0-.2-.06-.38-.06-.58 0-61.86 50.14-112 112-112s112 50.14 112 112c0 .2-.06.38-.06.58.11 85.1 23.31 131.46 44.53 159.42H67.53zM224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64z"
		/>
	</svg>
);
