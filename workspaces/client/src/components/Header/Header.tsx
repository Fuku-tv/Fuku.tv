import * as React from 'react';

import { isMobile } from 'react-device-detect';
import { NavLink } from 'react-router-dom';
import { Squash as Hamburger } from 'hamburger-react';
import useAuthState from 'src/state/hooks/useAuthState';
import { useGameState } from 'src/state/hooks';

import ProfileImage from 'src/components/UIElements/ProfileImage/ProfileImage';
import ContentContainer from '../UIElements/ContentContainer/ContentContainer';
import Modal from '../UIElements/Modal/Modal';
import NavLinks from './NavLinks/NavLinks';
import SideBar from '../Screens/MainScreen/Sidebar/Sidebar';
import SideDrawer from '../UIElements/SideDrawer/SideDrawer';
import './Header.scss';
import FlatButton from '../UIElements/FlatButton/FlatButton';
import HeaderProfileDropdown from './HeaderProfileDropdown/HeaderProfileDropdown';
import NotificationDropdown from './NotificationsDropdown/NotificationsDropdown';

const Header: React.FC = () => {
  const { state, actions } = useAuthState();
  const gameState = useGameState();
  // testing const [modalIsActive, 		setModalIsActive] = React.useState < boolean
  // > (false);

  const [navIsOpen, setNavIsOpen] = React.useState<boolean>(false);
  const [chatIsOpen, setChatIsOpen] = React.useState<boolean>(false);

  const closeDrawer = () => {
    setNavIsOpen(false);
  };

  // const modalTestHandler = () => { 		setModalIsActive((prev) => !prev); };

  const sideDrawerContentChat = (
    <SideDrawer closeDrawer={closeDrawer} show={chatIsOpen}>
      <SideBar />
    </SideDrawer>
  );
  const sideDrawerContentLinks = (
    <SideDrawer closeDrawer={closeDrawer} show={navIsOpen}>
      <NavLinks />
    </SideDrawer>
  );

  const chatClickHandler = () => {
    setChatIsOpen((d) => !d);
    setNavIsOpen(false);
  };
  const navClickHandler = () => {
    setNavIsOpen((d) => !d);
    setChatIsOpen(false);
  };

  const profileButton = (
    <div className="user-actions-container">
      {state.isAuthenticated ? (
        <HeaderProfileDropdown id="header-profile-button" />
      ) : (
        <FlatButton id="profile-dropdown-button" width={180} text="Sign In" onClick={actions.loginWithPopup} ghost />
      )}
    </div>
  );

  return (
    <>
      <header>
        <div className="header-inner-wrapper">
          {isMobile && (
            <button onClick={chatClickHandler} onKeyDown={chatClickHandler} className="icon-wrapper">
              {chatIcon}
            </button>
          )}

          <NavLink id="logo" to="/" exact>
            {fukuLogo}
          </NavLink>
          {!isMobile && <ContentContainer> {profileButton} </ContentContainer>}
          {isMobile && (
            <button onClick={navClickHandler} className="hamburger-icon-wrapper">
              <Hamburger distance="lg" duration={0.3} size={24} toggled={navIsOpen || chatIsOpen} />
            </button>
          )}
        </div>
        {sideDrawerContentLinks}
        {sideDrawerContentChat}
      </header>
    </>
  );
};

export default Header;
const fukuLogo = (
  <svg id="fuku" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485.55 147.32">
    <g id="icon">
      <path
        d="M30.39,42c2.3.76,2.3.78.57,2.62a1,1,0,0,0-.29.64c0,5.46,0,10.91,0,16.53,2.18,0,4.29,0,6.4,0,.23,0,.49-.34.66-.57.37-.52.68-1.07,1-1.66l7.73,5.91c0,.1,0,.21,0,.23-1.46,1.15-2,2.8-2.68,4.47-2.89,7.43-7.26,14-12,20.37-.21.28-.4.56-.66.93,1.34.63,2.61,1.23,3.86,1.85a55.42,55.42,0,0,1,11.85,7.85,1,1,0,0,1,.32,1.5c-1.59,3.08-3.12,6.19-4.74,9.41a44.28,44.28,0,0,0-11.77-9.83v47.85H21.38V103L7.82,115.1l-1.9-4.55v-8.09c11.62-8.32,20.4-19,27.21-31.75H6.83V61.77H21.39V48.71c0-2.23,0-4.47.06-6.69Z"
        transform="translate(-5.92 -36.27)"
      />
      <path
        d="M58.46,145.11v4.58H50.61V101.44H109.7v46.32h-7.83v-2.65Zm43.29-7.59V126.81H83.9v10.71ZM75.89,126.8H58.54v10.69H75.89Zm25.89-17.9H83.92v10.29h17.86Zm-25.89,0H58.54v10.25H75.89Z"
        transform="translate(-5.92 -36.27)"
      />
      <path
        d="M102.61,67.14v26.1H55.76V67.14ZM94.78,85.79c0-3.47,0-6.83,0-10.19,0-.93-.24-1.19-1.18-1.19-9.61,0-19.21,0-28.82,0-.37,0-.75,0-1.13,0v11.3Z"
        transform="translate(-5.92 -36.27)"
      />
      <path d="M47.75,57.92V49.27h63.78v8.65Z" transform="translate(-5.92 -36.27)" />
    </g>
    <path
      d="M206.48,43.67l2.46-1.35a11,11,0,0,1,1.57.34q1.35.33,3,.78c1.12.3,2.2.56,3.25.79a13.36,13.36,0,0,0,2,.33h.67c1.05,0,1.57.38,1.57,1.12l4.49-.22a5.8,5.8,0,0,0,1.79.22H232l4.93.9,3.14,1.35a2,2,0,0,1,.9.22l.9.45.89.45-.89.67v.9L240.11,52l1.35,2.25-2,.89a16.79,16.79,0,0,0-3.14.23l-5.16.67-3.81-.9-1.12.9-1.79.67-2,3.37.45.44a4,4,0,0,0-1,2.69,5.61,5.61,0,0,1-.56,2.47L220.16,65l-2.25,7.62.68-.22L217.24,80a11,11,0,0,0,.34,3.25,1.69,1.69,0,0,0,1.12,1.24,5.51,5.51,0,0,0,2.24,0,23.09,23.09,0,0,1,3.48-.23L230,85.6a9.78,9.78,0,0,0,4.49,1.34,11.58,11.58,0,0,1,4.71,1.35l.22,4,.9.68v.45l-2.69,1.34c-.31.15-.9.41-1.8.79a6.27,6.27,0,0,1-1.79.56l-18.61.67-.68,4,.23,2.91a7.55,7.55,0,0,1-.79,2.58c-.37.67-.75,1.38-1.12,2.13a16.4,16.4,0,0,0-1,2.69,14,14,0,0,0-.45,3.81c0,.45,0,.71-.11.79a.66.66,0,0,0-.11.45,6.09,6.09,0,0,0,.22,1.23c.15.6.38,1.57.68,2.91a2.69,2.69,0,0,1-1.24.68,1,1,0,0,0-.78,1.12l.45,4.93.45.9-.45.45.45.67.22,2.24q.68,0,.78-1.23t.12-1.68v-2q1.33,0,1.23,2.58a19.83,19.83,0,0,0,.11,3.92v3.36l-1.12.9a.5.5,0,0,1,.34.11.42.42,0,0,0,.33.12l.23.44-.9,1.12.9.45-1.12,1.8h1.12a14,14,0,0,0,.22,2.69c.15.74.3,1.64.45,2.69l-2.91,1.79-5.39,2.47-8.74-1.57-2-1.35-2.91-.22-2-1.79c-2.55-1-3.81-1.95-3.81-2.69a2,2,0,0,1,.22-.9l1.35-9,.89-2.47a22.94,22.94,0,0,1,.79-3.7,14,14,0,0,0,.56-3.92,2.69,2.69,0,0,0-.11-.79,2.28,2.28,0,0,1-.12-.78c.15,0,.3-.52.45-1.57s.3-2.24.45-3.59a33.62,33.62,0,0,0,.23-3.7v-1.9a18.7,18.7,0,0,1,2.35-7.18,12.93,12.93,0,0,0,1.68-7l-9.64.45-4.26.9-6.5-4.27c-.45-.14-1-.74-1.8-1.79L172.17,91V87.39l1.12-.9h21.53l.67-1.57,1.79-5.38h-.67l.67-4.93-.89-1.12.67-1.79h-.22q.21-.45,1.68-3c1-1.72,1.6-2.8,1.9-3.25v-.9a.64.64,0,0,0-.22-.45l1.12-2.24a3.89,3.89,0,0,0,.11-1.68,1.7,1.7,0,0,1,.34-1.46l2.46-6.95.9-1.8.45-3.36Zm17.94,40.58a.91.91,0,0,1-.68-.22Z"
      transform="translate(-5.92 -36.27)"
    />
    <path
      d="M294.15,93.22l1.12-2.69.68,1.12-.45.9.45,2.24h1.12l1.79-5.38-.22-1.12-1.57.45a1.15,1.15,0,0,0,0-1.35,5,5,0,0,1-.68-1.34L298,82V80.22c0-.75.3-1.13.9-1.13L298.64,76h.67a1.85,1.85,0,0,0,1.12-.68l6.28.68,2-.9,2.91.9.9-.68.67.45h1.12l3.81,3.14v.67l2.47,1.35a12.2,12.2,0,0,0,.67,1.57,3.47,3.47,0,0,1,.45,1.34l.23.68-.68.44-.45,2.7a3.26,3.26,0,0,1-.67,1.68,3.45,3.45,0,0,0-.67,1.9l-.9,4.71a9.14,9.14,0,0,1-1.12,2.92,8.63,8.63,0,0,0-1.12,3.14v2.91a18.07,18.07,0,0,1-1.34,4.37,21.24,21.24,0,0,0-1.35,7.74v1.79c0,.31-.08.45-.22.45l-.23-.22-.45-.23V119l-1.12,1.57v4.93l-.89,2.24.89,4.71v3.14a16.57,16.57,0,0,1-.22,2.8c-.15.82-.38,1.24-.67,1.24h-1.13a8.46,8.46,0,0,1-4.59.9c-1.57-.16-3.41.44-5.5,1.79h-1.12a5.85,5.85,0,0,1-3.81-1.12L289,137.62V130c-2.39,1.49-4.48,2.84-6.27,4s-4.57,1.95-8.3,2.24l-4.93.45-1.8-.22-1.12.67-.45-1.12a13.11,13.11,0,0,1-1.45-.11,14.59,14.59,0,0,0-1.69-.11h-.67a9.48,9.48,0,0,1-3.59-1,21.4,21.4,0,0,1-4.37-2.69,18.67,18.67,0,0,1-3.7-3.93,9.49,9.49,0,0,1-1.79-4.71l-1.57-4.71,1.12-3.13.22-5.61a9.67,9.67,0,0,1,.23-1.79,13.74,13.74,0,0,1,.45-1.8,1.76,1.76,0,0,0-.12-.56,2,2,0,0,1-.11-.56l.9-2.91v-2a1.77,1.77,0,0,1,.22-1.12l.68-1.35a10.83,10.83,0,0,0,.33-2.13c.08-1,.11-1.6.11-1.91L252,92.1l2-3.36V87.39q.45-1.78.9-4.59c.3-1.87,1.27-2.81,2.92-2.81a7.47,7.47,0,0,1,3.92,1.35,19.75,19.75,0,0,1,3.92,3.25,23.87,23.87,0,0,1,3,3.92,6.93,6.93,0,0,1,1.23,3.37,9.9,9.9,0,0,1-1.12,4.48,12.46,12.46,0,0,0-1.12,5.61l.23,1.34-3.37,14.58.9,2.69.9,2.24a1.73,1.73,0,0,0,1.79,1.12,31.41,31.41,0,0,0,12-2.24,22.08,22.08,0,0,0,9.08-6.73l.67-.89v-1a2.12,2.12,0,0,1,.23-1,7.48,7.48,0,0,1,.44-1.12l.45.89,4.71-3.36a1,1,0,0,1-.11-.79c.07-.22-.11-.48-.56-.78a1.82,1.82,0,0,1-1.12.67,16.79,16.79,0,0,0-2-.45,5,5,0,0,1,1.12-3.47,5.11,5.11,0,0,0,1.35-2.36h-.23c-.45,0-.9-.44-1.34-1.34a1,1,0,0,0-.68.22.66.66,0,0,1-.44.23,23.07,23.07,0,0,1,1.68-2.13,4.27,4.27,0,0,0,1.23-2.13Zm.23,5.61h-.68l-.22.22.9.9Zm.89,6.72.45.23c.45,0,.79-.37,1-1.12a33.74,33.74,0,0,1,1.46-3.59c-.6,0-1.23.56-1.91,1.68A5.86,5.86,0,0,0,295.27,105.55Zm.9-7.62.45-1.34-.67.89Z"
      transform="translate(-5.92 -36.27)"
    />
    <path
      d="M327.11,132l1.12-.89h-1.12V130c0-.15.15-.37.45-.68l.67.9,3.82-4.26a1.58,1.58,0,0,1-.23-.67c0-.15-.22-.37-.67-.68a5,5,0,0,1-.9.79,10.26,10.26,0,0,1-2.24.11,2.48,2.48,0,0,1-.22-1.12,4.91,4.91,0,0,1,.78-2.91,3.93,3.93,0,0,0,.78-2.25h-.44c-.3,0-.68-.3-1.12-.89a1.07,1.07,0,0,0-.79.33.89.89,0,0,1-.56.34,10.77,10.77,0,0,1,1.23-2.58,5.78,5.78,0,0,0,1-2.35l-.89-2.92a11.86,11.86,0,0,1,.11-1.57,17.31,17.31,0,0,0,.11-2c0-.74,0-1.49-.11-2.24a23.5,23.5,0,0,1-.11-2.47l.44-.89c0-2.09-.15-3.18-.44-3.25s-.45-.49-.45-1.24c0-.14.29-.52.89-1.12-.3-.3-.44-.52-.44-.67a1.91,1.91,0,0,1,.56-1.12,2.4,2.4,0,0,0,.56-1.57l-.68-.23a16.83,16.83,0,0,0,.9-4.48c.15-1.8.3-3.62.45-5.49s.26-3.59.34-5.16a13.61,13.61,0,0,1,.56-3.7,27.78,27.78,0,0,1,1.23-9.08,23.81,23.81,0,0,0,1.23-8c0-1.5.08-3.29.23-5.39s.33-4.07.56-5.94.41-3.47.56-4.82.22-2.16.22-2.47h1.57l3.81-2h2.47a2.29,2.29,0,0,1,1.91,1.12,11.57,11.57,0,0,0,2.13,2.24L350,43l1.35,1.35a5.54,5.54,0,0,1-.11,1,4.78,4.78,0,0,0-.11,1l-.68,4a46.48,46.48,0,0,0,.56,5.5,46.37,46.37,0,0,1,.56,5.49l-.22.45.22,5.83a1.32,1.32,0,0,1-.44.9,2.14,2.14,0,0,0-.45,1.57,2.09,2.09,0,0,1,.22.89c0,.6-.22.9-.67.9s-.67.15-.67.45l.22.22h.9a2.68,2.68,0,0,1-.34,1.12,2.76,2.76,0,0,0-.34,1.12c.6.31,1,1.13,1.13,2.47a41.26,41.26,0,0,1,.22,4.26l.45.23a1.24,1.24,0,0,1-.45.56c-.15.07-.22.26-.22.56a1.24,1.24,0,0,0,.44.89c0,.75-.22,1.16-.67,1.24s-.67.71-.67,1.9c0,.45.45.68,1.34.68-.89.89-1.34,1.27-1.34,1.12,0,.3.3.52.9.67l.67,2.24a5.53,5.53,0,0,0-1.35,3.14v.45a5.76,5.76,0,0,0,2.13-1.57,13.27,13.27,0,0,1,1.91-1.79L359,89.41l-.45-.22a5.51,5.51,0,0,0,2.58-.79c1-.52,1.91-1,2.81-1.57a20.38,20.38,0,0,0,2.35-1.57,3.84,3.84,0,0,1,1.23-.78,1.52,1.52,0,0,0-.11-.68,1,1,0,0,1-.11-.44l.67-.68,9.87-8.07,2-2a9.2,9.2,0,0,0,1.68-1.46l1.68-1.68.45-.45h-.9l2.69-2.69a.6.6,0,0,1-.22-.44,2.62,2.62,0,0,1,.89-1.8,2.52,2.52,0,0,1,1.58-.9c.14,0,.25.12.33.34a.53.53,0,0,0,.56.34l1.12-.23c.15,0,.41.19.79.56a1.4,1.4,0,0,0,1.68.45,1.63,1.63,0,0,1,.67-.11,2.46,2.46,0,0,1,1.57.9,12.35,12.35,0,0,1,1.68,2.13,16.66,16.66,0,0,1,1.35,2.58,6.12,6.12,0,0,1,.56,2.24l-.67,1.79L396,75.51a31.7,31.7,0,0,1-4.26,3.58,30,30,0,0,0-4,3.37l-8.53,9.19L377.34,93a30.75,30.75,0,0,1,2.35,4.93,21.83,21.83,0,0,1,1.24,3.59l1.79,6.5a23,23,0,0,0,3.48,7.07,76.72,76.72,0,0,1,4.82,8l-.67,3.36,2.46,1.79,2.24,2.92-.67,2.46,2.24,1.13L396,137.4a6.07,6.07,0,0,0,.23,1.34,1.57,1.57,0,0,0,.67,1.12l.45.9a94.21,94.21,0,0,0,3.25,9.42q2.13,5.37,4.26,10.31t5,11.44v-2.25a4.09,4.09,0,0,1-.44-2.46,4.16,4.16,0,0,0-.45-2.47l1.12-.45c.45,1.94.82,3.44,1.12,4.49s.52,1.9.67,2.58.26,1.19.34,1.57a6.62,6.62,0,0,1,.11,1.23,3.25,3.25,0,0,1-.22,1.34L411,177.76l-2.47,1.34-2.24,2.24-2.69-.44-1.57.67-.68,1.79a4.94,4.94,0,0,1-1.79.12,6.18,6.18,0,0,0-2,.11l-.45-.9c-.3-.9-.89-2.35-1.79-4.37s-1.87-4.15-2.92-6.39-2.05-4.38-3-6.39-1.68-3.48-2.13-4.38l-2.47-2.24-1.12-3.14-1.12-.45-1.57-3.58a30.54,30.54,0,0,1-2.36-4.82,9.17,9.17,0,0,1-.56-2.58,1.31,1.31,0,0,1,.68-1.12l-1.35-2.69-.9-2.7q-4.49-11-7.51-15.69T365.46,117v-.45h1.12v-.67a5.27,5.27,0,0,0-.56-1.68,6.18,6.18,0,0,1-.56-1.46v-.45c0-.3.07-.48.22-.56s.22-.26.22-.56h-.44l-1.35-2c-.3-.14-.6-.82-.9-2a5.73,5.73,0,0,0-.89-2.24l-.68-1.57a13.93,13.93,0,0,1-4.82,3.25,13.41,13.41,0,0,0-4.59,3l-4,1.57V130l.67.22a7.4,7.4,0,0,0-.45,2.24q0,.9.45.9l-.45,1.12a2.48,2.48,0,0,0-.22,1.12,4.44,4.44,0,0,0,.45,2,4.44,4.44,0,0,1,.45,2v1.12l-.45.45.9,1.12a1.48,1.48,0,0,0-.34.45,1.3,1.3,0,0,1-.56.45v-.45a5.57,5.57,0,0,0-1.57.67l2.24.45a3.72,3.72,0,0,1-2.47,1.34,4.41,4.41,0,0,1-1-.89c-.08-.15-.49-.23-1.24-.23a21.15,21.15,0,0,0-5.15.68c-1.8.44-3.22.82-4.27,1.12q-4.49-.67-5.94-2.36a5.27,5.27,0,0,1-1.45-3.47,3.14,3.14,0,0,1,.22-1.35v-.22c0-.6.22-.93.67-1s.67-.71.67-1.91c0-.45-.82-.67-2.46-.67Zm1.57-15h-.45l-.22.22c0,.16.3.38.9.68Zm.67,5.38v-1.12c-.15,0-.3.23-.44.67Zm1.8.9c.74,0,1.12-.3,1.12-.9a22.1,22.1,0,0,1,.67-3.81c-.3,0-.6.22-.89.67a2.12,2.12,0,0,0-.45,1.12c0,.15,0,.23.11.23s.11.08.11.22a1.3,1.3,0,0,1-.45.9,1.52,1.52,0,0,0-.45,1.12A.66.66,0,0,0,331.15,123.27Zm66.6,15.25.44-.23a.8.8,0,0,1,.9.9.59.59,0,0,1-.67.67.8.8,0,0,1-.9-.9A.62.62,0,0,1,397.75,138.52Zm1.79,2.69.22.45v.44c-.6,0-.89-.37-.89-1.12h.22A.66.66,0,0,1,399.54,141.21Zm4,5.6-.68,1.35-2-2.47-.67-1.79,1.12.67Zm.89,4.26.45.68-1.79-.45Zm1.8,4.49h.44c.3,0,.45.07.45.22a.74.74,0,0,1-.45.68,2.09,2.09,0,0,1-.89.22c-.3,0-.45-.08-.45-.22C405.37,156.15,405.67,155.86,406.27,155.56Zm2,2.24.45,1.12-.67,1.12-1.35-.45.68-1.34Z"
      transform="translate(-5.92 -36.27)"
    />
    <path
      d="M463.67,93.22l1.12-2.69.67,1.12-.45.9.45,2.24h1.12l1.8-5.38-.23-1.12-1.57.45a1.11,1.11,0,0,0,0-1.35,5.1,5.1,0,0,1-.67-1.34l1.57-4V80.22c0-.75.3-1.13.9-1.13L468.15,76h.68a1.87,1.87,0,0,0,1.12-.68l6.27.68,2-.9,2.92.9.89-.68.68.45h1.12l3.81,3.14v.67l2.47,1.35a10.93,10.93,0,0,0,.67,1.57,3.47,3.47,0,0,1,.45,1.34l.22.68-.67.44-.45,2.7a3.26,3.26,0,0,1-.67,1.68,3.45,3.45,0,0,0-.67,1.9l-.9,4.71A9.41,9.41,0,0,1,487,98.83a8.63,8.63,0,0,0-1.12,3.14v2.91a17.81,17.81,0,0,1-1.35,4.37,21.24,21.24,0,0,0-1.34,7.74v1.79c0,.31-.08.45-.23.45l-.22-.22-.45-.23V119l-1.12,1.57v4.93l-.9,2.24.9,4.71v3.14a15.53,15.53,0,0,1-.23,2.8c-.15.82-.37,1.24-.67,1.24h-1.12a8.51,8.51,0,0,1-4.6.9q-2.35-.24-5.49,1.79h-1.12a5.81,5.81,0,0,1-3.81-1.12l-5.61-3.59V130c-2.39,1.49-4.48,2.84-6.28,4s-4.56,1.95-8.29,2.24l-4.94.45-1.79-.22-1.12.67-.45-1.12a13.25,13.25,0,0,1-1.46-.11,14.3,14.3,0,0,0-1.68-.11h-.67a9.43,9.43,0,0,1-3.59-1,21.13,21.13,0,0,1-4.37-2.69,18.17,18.17,0,0,1-3.7-3.93,9.6,9.6,0,0,1-1.8-4.71l-1.57-4.71,1.12-3.13.23-5.61a9.51,9.51,0,0,1,.22-1.79,15.57,15.57,0,0,1,.45-1.8,2,2,0,0,0-.11-.56,1.66,1.66,0,0,1-.11-.56l.89-2.91v-2a1.75,1.75,0,0,1,.23-1.12l.67-1.35a10,10,0,0,0,.34-2.13c.07-1,.11-1.6.11-1.91l.67-1.79,2-3.36V87.39q.45-1.78.9-4.59c.29-1.87,1.27-2.81,2.91-2.81a7.5,7.5,0,0,1,3.93,1.35,20.34,20.34,0,0,1,3.92,3.25,25,25,0,0,1,3,3.92,6.93,6.93,0,0,1,1.23,3.37,9.9,9.9,0,0,1-1.12,4.48,12.46,12.46,0,0,0-1.12,5.61l.22,1.34-3.36,14.58.9,2.69c.29.75.59,1.49.89,2.24a1.75,1.75,0,0,0,1.8,1.12,31.33,31.33,0,0,0,12-2.24,22.08,22.08,0,0,0,9.08-6.73l.68-.89v-1a2.23,2.23,0,0,1,.22-1,8.63,8.63,0,0,1,.45-1.12l.45.89,4.71-3.36a1.06,1.06,0,0,1-.12-.79c.08-.22-.11-.48-.56-.78a1.8,1.8,0,0,1-1.12.67,16,16,0,0,0-2-.45,5,5,0,0,1,1.13-3.47,5.17,5.17,0,0,0,1.34-2.36h-.22c-.45,0-.9-.44-1.35-1.34a1,1,0,0,0-.67.22.66.66,0,0,1-.45.23q.45-.68,1.68-2.13a4.31,4.31,0,0,0,1.24-2.13Zm.22,5.61h-.67l-.22.22.89.9Zm.9,6.72.45.23c.45,0,.78-.37,1-1.12a31.1,31.1,0,0,1,1.45-3.59c-.6,0-1.23.56-1.9,1.68A5.76,5.76,0,0,0,464.79,105.55Zm.9-7.62.44-1.34-.67.89Z"
      transform="translate(-5.92 -36.27)"
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
