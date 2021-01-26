import React from 'react';
import { isMobile } from 'react-device-detect';
import MainDisplay from './MainDisplay/MainDisplay';
import Sidebar from './Sidebar/Sidebar';
import './Body.css';

const Body: React.FC = () => {
  return (
    <main>
      <div className="main__inner-wrapper">
        <MainDisplay /> {!isMobile && <Sidebar />}
      </div>
    </main>
  );
};

export default Body;
