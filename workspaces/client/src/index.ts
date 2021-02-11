import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Amplify, { Auth } from 'aws-amplify';
import App from './App';

Amplify.configure({ Auth: { region: 'us-east-1' } });
ReactDOM.render(React.createElement(App), document.getElementById('app'));

interface HotModule {
  hot?: {
    accept: () => void;
  };
}

// register service.worker.js for PWA
// const swName = `/service-worker.js`;
// if (`serviceWorker` in navigator) {
//   window.addEventListener(`load`, () => {
//     // unregister
//     navigator.serviceWorker.register(swName);
//   });
// }

// unregister all service workers
navigator.serviceWorker.getRegistrations().then((registrations) => {
  for (const registration of registrations) {
    registration.unregister();
    console.log('unregistered serviceworker: ', registration.active);
  }
});

if ((module as HotModule).hot) {
  (module as HotModule).hot.accept();
}
