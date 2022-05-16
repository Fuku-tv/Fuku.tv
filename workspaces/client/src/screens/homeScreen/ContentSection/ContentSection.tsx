import * as React from 'react';
import { useAuthState } from 'src/state/hooks';

import DonateButton from 'src/components/elements/DonateButton';
import LoggedOutContent from './LoggedOutContent';
import LoggedInContent from './LoggedInContent/LoggedInContent';

import './ContentSection.scss';

const ContentSection: React.FC = () => {
  const authState = useAuthState();
  return (
    <>
      <section id="content-section">{authState.state.isAuthenticated ? <LoggedInContent /> : <LoggedOutContent />}</section>

      <DonateButton />
    </>
  );
};

export default ContentSection;
