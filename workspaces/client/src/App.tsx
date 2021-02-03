import * as React from 'react';

import './App.scss';
// workaround for react-awesome-button css import bug
import './styles.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import AboutScreen from './components/Screens/AboutScreen/AboutScreen';
import ProfileScreen from './components/Screens/ProfileScreen/ProfileScreen';
import Sidebar from './components/Sidebar/Sidebar';
import Provider from './state';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import ContentContainer from './components/UIElements/ContentContainer/ContentContainer';
// import SideBar from './components';

const App: React.FC = () => {
	let routes = (
		<Switch>
			<Route path="/" exact>
				<Main />
			</Route>
			<Route path="/about" exact>
				<AboutScreen />
			</Route>
			<Route path="/profile" exact>
				<ProfileScreen />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
	return (
		<Provider>
			<Router>
				<Header />
				<main>
					<ContentContainer>{routes}</ContentContainer>
				</main>
			</Router>
		</Provider>
	);
};

export default App;
