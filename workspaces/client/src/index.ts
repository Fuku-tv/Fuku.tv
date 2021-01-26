import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(React.createElement(App), document.getElementById('app'));

// register service.worker.js for PWA
const swName = `/service-worker.js`;
if (`serviceWorker` in navigator) {
  window.addEventListener(`load`, () => {
    navigator.serviceWorker.register(swName);
  });
}
