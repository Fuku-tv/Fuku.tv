import * as React from 'react';
import CurrentlyWaiting from './CurrentlyWaiting/CurrentlyWaiting';

interface PROPS {
  showQueue?: boolean;
}
const SpectatorInformation: React.FC<PROPS> = ({ showQueue }) => (
  <div>
    <CurrentlyWaiting />
  </div>
);

export default SpectatorInformation;
