/* eslint-disable import/no-unassigned-import */
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App';

const container = document.querySelector('#app');

// if statement for typescript strict null checking
if (container) {
  // hydrate the app if it's already rendered on the client
  if (container.hasChildNodes()) {
    hydrateRoot(container, <App />);
  }
  // otherwise render the app on the client
  else {
    createRoot(container).render(<App />);
  }
}

// interface HotModule {
//   hot?: {
//     accept: () => void;
//   };
// }

// if ((module as HotModule).hot) {
//   (module as HotModule).hot.accept();
// }
