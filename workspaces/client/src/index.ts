import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(React.createElement(App), document.getElementById('app'));

interface HotModule {
  hot?: {
    accept: () => void;
  };
}

// force uninstall obsolete service worker
window.addEventListener(`load`, () => {
  // unregister all service workers
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
});

// unregister all service workers
// navigator.serviceWorker.getRegistrations().then((registrations) => {
//   for (const registration of registrations) {
//     registration.unregister();
//     console.log('unregistered serviceworker: ', registration.active);
//   }
// });

if ((module as HotModule).hot) {
  (module as HotModule).hot.accept();
}
