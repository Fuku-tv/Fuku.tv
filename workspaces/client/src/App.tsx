import * as React from 'react';
import { isMobile } from 'react-device-detect';
import './App.scss';
// workaround for react-awesome-button css import bug
import './styles.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Sidebar from './components/Sidebar/Sidebar';
import Provider from './state';
// import SideBar from './components';

const App: React.FC = () => (
	<Provider>
		<Header />
		<div className="main-outer-wrapper">
			<Main />
			{!isMobile && <Sidebar />}
		</div>
	</Provider>
);

export default App;
