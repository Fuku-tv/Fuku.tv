import * as React from 'react';
import { isMobile } from 'react-device-detect';
import useAuthState from 'src/state/hooks/useAuthState';
import { Squash as Hamburger } from 'hamburger-react';
import Modal from '../UIElements/Modal/Modal';
import SideDrawer from '../UIElements/SideDrawer/SideDrawer';
import SideBar from '../Sidebar/Sidebar';
import './Header.scss';

const Header: React.FC = () => {
  const { state, actions } = useAuthState();

  // testing const [modalIsActive, 		setModalIsActive] = React.useState < boolean
  // > (false);

  const [drawerIsOpen, setDrawerIsOpen] = React.useState<boolean>(false);

  const closeDrawer = () => {
    setDrawerIsOpen(false);
    console.log('CLOSE');
  };

  // const modalTestHandler = () => { 		setModalIsActive((prev) => !prev); };

  const sideDrawerContent = (
    <SideDrawer closeDrawer={closeDrawer} show={drawerIsOpen}>
      <SideBar />
    </SideDrawer>
  );

  const animatedNavBtn =
    !state.isAuthenticated && !drawerIsOpen ? signInIcon : <Hamburger distance="lg" duration={0.3} size={24} toggled={drawerIsOpen} />;

  return (
    <>
      <header>
        <div className="header-inner-wrapper">
          <div className="logo">
            <span className="logo__icon">{fukuIcon}</span>
            <span>fuku.tv</span>
          </div>
          {isMobile && (
            <div onClick={() => setDrawerIsOpen((d) => !d)} className="hamburger-icon-wrapper">
              {drawerIsOpen ? timesIcon : chatIcon}
            </div>
          )}
        </div>
        {sideDrawerContent}
      </header>
    </>
  );
};

export default Header;
const chatIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="comments"
    className="svg-inline--fa fa-comments fa-w-18"
    role="img"
    viewBox="0 0 576 512"
  >
    <path
      fill="currentColor"
      d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"
    />
  </svg>
);

const signInIcon = (
  <div className="sign-in-icon-wrapper">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="sign-in-alt"
      className="svg-inline--fa fa-sign-in-alt fa-w-16"
      role="img"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"
      />
    </svg>
  </div>
);

const fukuIcon = (
  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496.27 507.85">
    <g id="fuku">
      <path
        d="M134.87,14.08c10.78,3.56,10.78,3.66,2.66,12.32a4.92,4.92,0,0,0-1.37,3c-.07,25.64-.06,51.28-.06,77.66,10.24,0,20.16.08,30.07-.13,1.07,0,2.31-1.59,3.1-2.7,1.71-2.42,3.17-5,4.91-7.79l36.33,27.76c0,.5.13,1,0,1.09-6.85,5.4-9.54,13.17-12.58,21-13.6,34.91-34.13,65.8-56.24,95.74-1,1.31-1.9,2.65-3.11,4.35,6.28,3,12.25,5.8,18.15,8.73a259,259,0,0,1,55.65,36.86c2.55,2.22,3.19,3.86,1.53,7.07-7.49,14.46-14.68,29.09-22.26,44.21-16-18.49-33.77-34-55.35-46.21V521.92H92.54V300.61L28.79,357.49c-3.37-8.1-6.15-14.76-8.92-21.41v-38C74.47,259,115.76,208.57,147.74,148.9H24.14v-42H92.56V101c0-18.49,0-37,0-55.47,0-10.49.19-21,.3-31.46Z"
        transform="translate(-19.87 -14.08)"
      />
      <path
        d="M92.87,14.08c-.11,10.48-.27,21-.3,31.46,0,18.49,0,37,0,55.47v5.91H24.14v42h123.6C115.76,208.57,74.47,259,19.87,298.08v-284Z"
        transform="translate(-19.87 -14.08)"
      />
      <path
        d="M266.76,498.51V520H229.9V293.27H507.56V510.94H470.77V498.51Zm203.45-35.67V412.51H386.3v50.33ZM348.68,412.47H267.14v50.22h81.54Zm121.65-84.11H386.39v48.35h83.94Zm-121.67.09H267.15v48.17h81.51Z"
        transform="translate(-19.87 -14.08)"
      />
      <path
        d="M474.24,132.1V254.76H254.09V132.1Zm-36.81,87.63c0-16.26-.16-32.06.1-47.85.08-4.39-1.11-5.6-5.55-5.58-45.14.16-90.27.1-135.4.11-1.78,0-3.55.16-5.35.24v53.08Z"
        transform="translate(-19.87 -14.08)"
      />
      <path d="M216.45,88.78V48.12H516.13V88.78Z" transform="translate(-19.87 -14.08)" />
    </g>
  </svg>
);

const hamburgerIcon = (
  <svg id="Layer_1" data-name="Layer 1" viewBox="0 0 45.5 32.5">
    <title>hamburgerIcon</title>
    <rect width="45.5" height="5.64" rx="2.82" />
    <rect y="13.43" width="45.5" height="5.64" rx="2.82" />
    <rect y="26.86" width="45.5" height="5.64" rx="2.82" />
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

const congratulationsModalContent = (
  <div className="congratulations-container">
    <h2>Congrats! You Won!</h2>
    <div className="modal__content_button">
      <p>Claim My Prize</p>
      {rightArrow}
    </div>
  </div>
);

const timesIcon = (
  <svg id="times-icon" viewBox="0 0 138.35 138.35">
    <rect x="378" y="135" width="18" height="180" rx="2" transform="translate(-45.38 -363.57) rotate(45)" />
    <rect x="378" y="135" width="18" height="180" rx="2" transform="translate(-363.57 183.73) rotate(-45)" />
  </svg>
);
