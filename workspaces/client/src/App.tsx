import * as React from 'react';
import Body from './components/Body/Body';
import './App.scss';
// workaround for react-awesome-button css import bug
import './styles.css';
import Header from './components/Header/Header';
import Provider from './state';

const App: React.FC = () => (
  <Provider>
    <Header />
    <Body />
  </Provider>
);

export default App;
