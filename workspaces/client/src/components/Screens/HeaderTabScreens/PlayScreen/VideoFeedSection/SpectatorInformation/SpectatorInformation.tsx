import * as React from 'react';
import CurrentlyWaiting from './CurrentlyWaiting/CurrentlyWaiting';
import CurrentlyWatching from './CurrentlyWatching/CurrentlyWatching';
import styles from './SpectatorInformation.module.scss';

interface PROPS {
  showQueue?: boolean;
  showWatching?: boolean;
}
const SpectatorInformation: React.FC<PROPS> = ({ showQueue, showWatching }) => {
  const [cameraIsFront, setCameraIsFront] = React.useState<boolean>(true);

  const both = (
    <>
      <CurrentlyWatching />
      <CurrentlyWaiting />
    </>
  );

  const individual = showQueue ? <CurrentlyWaiting /> : <CurrentlyWatching />;

  return (
    <div className="spectator-information-container">
      <CurrentlyWaiting />
    </div>
  );
};

export default SpectatorInformation;
