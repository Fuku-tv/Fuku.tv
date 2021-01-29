import * as React from 'react';
import CurrentlyWaiting from './CurrentlyWaiting/CurrentlyWaiting';
import CurrentlyWatching from './CurrentlyWatching/CurrentlyWatching';
import './SpectatorInformation.scss';

const SpectatorInformation : React.FC = () => {
  const [cameraIsFront,
    setCameraIsFront] = React.useState < boolean > (true);

  return (
    <div className="spectator-information-container">
      <CurrentlyWaiting/>
      <CurrentlyWatching/>
    </div>
  );
};

export default SpectatorInformation;
