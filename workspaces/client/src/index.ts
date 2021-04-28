import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(React.createElement(App), document.getElementById('app'));

interface HotModule {
  hot?: {
    accept: () => void;
  };
}

if ((module as HotModule).hot) {
  (module as HotModule).hot.accept();
}
