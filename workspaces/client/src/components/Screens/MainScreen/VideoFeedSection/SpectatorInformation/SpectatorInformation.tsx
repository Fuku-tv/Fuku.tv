import * as React from 'react';
import CurrentlyWaiting from './CurrentlyWaiting/CurrentlyWaiting';
import CurrentlyWatching from './CurrentlyWatching/CurrentlyWatching';
import './SpectatorInformation.scss';

interface PROPS {
  showQueue?: boolean;
  showWatching?: boolean;
}
const SpectatorInformation: React.FC<PROPS> = ({ showQueue, showWatching }) => {
  const [cameraIsFront, setCameraIsFront] = React.useState<boolean>(true);

  return (
    <div className="spectator-information-container">
      {!showQueue && <CurrentlyWatching />}
      {!showWatching && <CurrentlyWaiting />}
    </div>
  );
};

export default SpectatorInformation;
