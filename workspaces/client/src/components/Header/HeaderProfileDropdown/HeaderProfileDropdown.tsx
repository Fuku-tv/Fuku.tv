import * as React from 'react';

import { isMobile } from 'react-device-detect';
import { NavLink } from 'react-router-dom';
import { Squash as Hamburger } from 'hamburger-react';
import useAuthState from 'src/state/hooks/useAuthState';
import FlatButton from 'src/components/UIElements/FlatButton/FlatButton';
import { useGameState } from 'src/state/hooks';

import ProfileImage from 'src/components/UIElements/ProfileImage/ProfileImage';

import './HeaderProfileDropdown.scss';

interface PROPS {
  id: string;
}

const DropdownButton: React.FC<PROPS> = (props) => {
  const { state, actions } = useAuthState();
  const gameState = useGameState();
  // testing const [modalIsActive, 		setModalIsActive] = React.useState < boolean
  // > (false);

  const [dropdownIsOpen, setDropdownIsOpen] = React.useState<boolean>(false);

  // const modalTestHandler = () => { 		setModalIsActive((prev) => !prev); };

  const linksDropdown = (
    <div className="dropdown-container__links">
      <ul>
        <li>
          <NavLink className="nav-link-item" activeClassName="nav-link__active" to="/profile" exact>
            <div className="dropdown-icon-wrapper">{profile}</div>
            <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link-item" activeClassName="nav-link__active" to="/claw-customization" exact>
            <div className="dropdown-icon-wrapper">{clawIcon}</div>
            <span>Claw Settings</span>
          </NavLink>
        </li>
        <li>
          <button className="nav-link-item" onClick={() => actions.logout()}>
            <div className="dropdown-icon-wrapper">{logoutIcon}</div>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );

  const buttonStyles = {
    background: dropdownIsOpen ? 'var(--purpleSecondary)' : 'inherit',
  };

  return (
    <button onClick={() => setDropdownIsOpen((s) => !s)} style={buttonStyles} id={props.id} className="header-profile-dropdown-container">
      <div className="header-profile-wrapper ">
        <div className="header-profile__content">
          <ProfileImage image={state.picture} size={28} />

          <div className="text-wrapper">
            <h2>{state.name}</h2>
            <div className="description">
              <span id="credits-value">{gameState.state.credits} Credits</span>
              <span className="divider">|</span>
              <span id="point-value">16 points</span>{' '}
            </div>
          </div>
        </div>

        <div className="down-arrow-wrapper">{downArrow}</div>
      </div>
      {dropdownIsOpen && linksDropdown}
    </button>
  );
};

export default DropdownButton;

const clawIcon = (
  <svg id="claw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 80">
    <path
      d="M294.5,74.5h-68a2,2,0,0,0-2,2v4a10,10,0,0,0,10,10h14v6a2,2,0,0,0,2,2h8v13.23L241,131.16a2,2,0,0,0-.37,2.08l8,20a2,2,0,0,0,1.86,1.26,1.91,1.91,0,0,0,.74-.14,2,2,0,0,0,1.12-2.6l-7.54-18.85,13.68-15.2V152.5a2,2,0,0,0,4,0V117.71l13.68,15.2-7.54,18.85a2,2,0,0,0,1.12,2.6,1.91,1.91,0,0,0,.74.14,2,2,0,0,0,1.86-1.26l8-20a2,2,0,0,0-.37-2.08L262.5,111.73V98.5h8a2,2,0,0,0,2-2v-6h14a10,10,0,0,0,10-10v-4A2,2,0,0,0,294.5,74.5Zm-26,20h-16v-4h16Zm24-14a6,6,0,0,1-6,6h-52a6,6,0,0,1-6-6v-2h64Z"
      transform="translate(-224.5 -74.5)"
    />
  </svg>
);

const logoutIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="sign-out-alt"
    className="svg-inline--fa fa-sign-out-alt fa-w-16"
    role="img"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
    />
  </svg>
);

const profile = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="user-alt"
    className="svg-inline--fa fa-user-alt fa-w-16"
    role="img"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"
    />
  </svg>
);

const downArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="caret-down"
    className="svg-inline--fa fa-caret-down fa-w-10"
    role="img"
    viewBox="0 0 320 512"
  >
    <path
      fill="currentColor"
      d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
    />
  </svg>
);

const rightArrow = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="long-arrow-alt-right"
    className="svg-inline--fa fa-long-arrow-alt-right fa-w-14"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z"
    />
  </svg>
);
