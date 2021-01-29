import * as React from 'react';
import { useGameState } from 'src/state/hooks';

interface Props {
  icon: string | JSX.Element;
  title: string;
}

const ProfileSat: React.FC<Props> = ({ icon, title }) => {
  const { state } = useGameState();
  return (
    <div className="profile-stat-wrapper">
      <span className="icon">{icon}</span>

      <span id="msgcredits" className="title">
        {title}
      </span>
      <span className="value">{state.credits}</span>
    </div>
  );
};

export default ProfileSat;
