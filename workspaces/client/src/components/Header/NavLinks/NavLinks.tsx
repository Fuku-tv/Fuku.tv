import * as React from 'react';
import { NavLink } from 'react-router-dom';
import useAuthState from 'src/state/hooks/useAuthState';
import { useGameState } from 'src/state/hooks';
import ProfileImage from 'src/components/UIElements/ProfileImage/ProfileImage';
import './NavLinks.scss';
import { isMobile } from 'react-device-detect';
import SignInPrompt from '../SignInPrompt/SignInPrompt';

const NavLinks: React.FC = () => {
  // testing const [modalIsActive, 		setModalIsActive] = React.useState < boolean
  // > (false);
  const { state, actions } = useAuthState();
  const gameState = useGameState();
  const stats = (
    <div className="profile-link__stats-container">
      <div className="stat-wrapper">
        <div className="icon">{credit}</div>
        <div className="text-wrapper">
          <div className="value">16</div>
          <div className="description">Total Points</div>
        </div>
      </div>
      <div className="stat-wrapper">
        <div className="icon">{credit}</div>
        <div className="text-wrapper">
          <div className="value">{gameState.state.credits}</div>
          <div className="description">Credits</div>
        </div>
      </div>
    </div>
  );

  const profileContent = (
    <>
      <div className="profile-link__name">
        <ProfileImage image={state.picture} size={36} />
        <h2>{state.name}</h2>
      </div>
      {isMobile && stats}
      <div className="profile-link__profile-sub-links">
        <NavLink activeClassName="nav-link__active--mobile" to="/profile" exact>
          <div className="profile-sub-link">
            <span>{profile}</span>
            <span>Profile</span>
          </div>
        </NavLink>
        <NavLink activeClassName="nav-link__active--mobile" to="/claw-customization" exact>
          <div className="profile-sub-link">
            <span>{clawIcon}</span>
            <span>Claw</span>
          </div>
        </NavLink>
        <NavLink to="/" exact>
          <div className="profile-sub-link">
            <span>{bellIcon}</span>
            <span>Notifications</span>
          </div>
        </NavLink>
        <button onClick={() => actions.logout()} onKeyDown={() => actions.logout()}>
          <div className="profile-sub-link">
            <span>{logoutIcon}</span>
            <span>Logout</span>
          </div>
        </button>
      </div>
    </>
  );

  const profileContentArea = state.isAuthenticated ? profileContent : <SignInPrompt />;
  return (
    <nav className="nav-links-container">
      {isMobile && <div id="nav-links__profile-content">{profileContentArea}</div>}
      <div id="nav-links__general-navigation">
        <ul id="primary-links">
          <li>
            <NavLink activeClassName="nav-link__active" to="/" exact>
              <div className="icon-wrapper">{play}</div>
              <span>Play </span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="nav-link__active" to="/leaderboards" exact>
              <div className="icon-wrapper">{trophy}</div>
              <span> Leaderboards </span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="nav-link__active" to="/prizes" exact>
              <div className="icon-wrapper">{gift}</div>
              <span> Prizes </span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="nav-link__active" to="/store" exact>
              <div className="icon-wrapper">{store}</div>
              <span> Store </span>
            </NavLink>
          </li>
        </ul>
        <ul id="secondary-links">
          <li>
            <NavLink activeClassName="nav-link__active" to="/about" exact>
              <span>About Fuku</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="nav-link__active" to="/legal" exact>
              <span> Legal </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavLinks;

const play = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="play"
    className="svg-inline--fa fa-play fa-w-14"
    role="img"
    viewBox="0 0 448 512"
  >
    <path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
  </svg>
);

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

const clawIcon = (
  <svg id="claw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 80">
    <path
      d="M294.5,74.5h-68a2,2,0,0,0-2,2v4a10,10,0,0,0,10,10h14v6a2,2,0,0,0,2,2h8v13.23L241,131.16a2,2,0,0,0-.37,2.08l8,20a2,2,0,0,0,1.86,1.26,1.91,1.91,0,0,0,.74-.14,2,2,0,0,0,1.12-2.6l-7.54-18.85,13.68-15.2V152.5a2,2,0,0,0,4,0V117.71l13.68,15.2-7.54,18.85a2,2,0,0,0,1.12,2.6,1.91,1.91,0,0,0,.74.14,2,2,0,0,0,1.86-1.26l8-20a2,2,0,0,0-.37-2.08L262.5,111.73V98.5h8a2,2,0,0,0,2-2v-6h14a10,10,0,0,0,10-10v-4A2,2,0,0,0,294.5,74.5Zm-26,20h-16v-4h16Zm24-14a6,6,0,0,1-6,6h-52a6,6,0,0,1-6-6v-2h64Z"
      transform="translate(-224.5 -74.5)"
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

const store = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="store"
    className="svg-inline--fa fa-store fa-w-20"
    role="img"
    viewBox="0 0 616 512"
  >
    <path
      fill="currentColor"
      d="M602 118.6L537.1 15C531.3 5.7 521 0 510 0H106C95 0 84.7 5.7 78.9 15L14 118.6c-33.5 53.5-3.8 127.9 58.8 136.4 4.5.6 9.1.9 13.7.9 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18.1 20.1 44.3 33.1 73.8 33.1 4.7 0 9.2-.3 13.7-.9 62.8-8.4 92.6-82.8 59-136.4zM529.5 288c-10 0-19.9-1.5-29.5-3.8V384H116v-99.8c-9.6 2.2-19.5 3.8-29.5 3.8-6 0-12.1-.4-18-1.2-5.6-.8-11.1-2.1-16.4-3.6V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V283.2c-5.4 1.6-10.8 2.9-16.4 3.6-6.1.8-12.1 1.2-18.2 1.2z"
    />
  </svg>
);

const credit = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="coins"
    className="svg-inline--fa fa-coins fa-w-16"
    role="img"
    viewBox="0 0 512 512"
  >
    <path d="M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z" />{' '}
  </svg>
);

const trophy = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="trophy"
    className="svg-inline--fa fa-trophy fa-w-18"
    role="img"
    viewBox="0 0 576 512"
  >
    <path
      fill="currentColor"
      d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"
    />
  </svg>
);

const award = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="award"
    className="svg-inline--fa fa-award fa-w-12"
    role="img"
    viewBox="0 0 384 512"
  >
    <path
      fill="currentColor"
      d="M97.12 362.63c-8.69-8.69-4.16-6.24-25.12-11.85-9.51-2.55-17.87-7.45-25.43-13.32L1.2 448.7c-4.39 10.77 3.81 22.47 15.43 22.03l52.69-2.01L105.56 507c8 8.44 22.04 5.81 26.43-4.96l52.05-127.62c-10.84 6.04-22.87 9.58-35.31 9.58-19.5 0-37.82-7.59-51.61-21.37zM382.8 448.7l-45.37-111.24c-7.56 5.88-15.92 10.77-25.43 13.32-21.07 5.64-16.45 3.18-25.12 11.85-13.79 13.78-32.12 21.37-51.62 21.37-12.44 0-24.47-3.55-35.31-9.58L252 502.04c4.39 10.77 18.44 13.4 26.43 4.96l36.25-38.28 52.69 2.01c11.62.44 19.82-11.27 15.43-22.03zM263 340c15.28-15.55 17.03-14.21 38.79-20.14 13.89-3.79 24.75-14.84 28.47-28.98 7.48-28.4 5.54-24.97 25.95-45.75 10.17-10.35 14.14-25.44 10.42-39.58-7.47-28.38-7.48-24.42 0-52.83 3.72-14.14-.25-29.23-10.42-39.58-20.41-20.78-18.47-17.36-25.95-45.75-3.72-14.14-14.58-25.19-28.47-28.98-27.88-7.61-24.52-5.62-44.95-26.41-10.17-10.35-25-14.4-38.89-10.61-27.87 7.6-23.98 7.61-51.9 0-13.89-3.79-28.72.25-38.89 10.61-20.41 20.78-17.05 18.8-44.94 26.41-13.89 3.79-24.75 14.84-28.47 28.98-7.47 28.39-5.54 24.97-25.95 45.75-10.17 10.35-14.15 25.44-10.42 39.58 7.47 28.36 7.48 24.4 0 52.82-3.72 14.14.25 29.23 10.42 39.59 20.41 20.78 18.47 17.35 25.95 45.75 3.72 14.14 14.58 25.19 28.47 28.98C104.6 325.96 106.27 325 121 340c13.23 13.47 33.84 15.88 49.74 5.82a39.676 39.676 0 0 1 42.53 0c15.89 10.06 36.5 7.65 49.73-5.82zM97.66 175.96c0-53.03 42.24-96.02 94.34-96.02s94.34 42.99 94.34 96.02-42.24 96.02-94.34 96.02-94.34-42.99-94.34-96.02z"
    />
  </svg>
);

const gift = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="gift"
    className="svg-inline--fa fa-gift fa-w-16"
    role="img"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"
    />
  </svg>
);
