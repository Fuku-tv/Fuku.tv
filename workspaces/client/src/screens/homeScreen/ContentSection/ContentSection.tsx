import * as React from 'react';
import { useAuthState } from 'src/state/hooks';

import DonateButton from 'src/components/elements/DonateButton';
import { Box } from '@chakra-ui/react';
import LoggedOutContent from './LoggedOutContent';
import LoggedInContent from './LoggedInContent/LoggedInContent';

import './ContentSection.scss';

const ContentSection: React.FC = () => {
  const authState = useAuthState();
  return (
    <>
      <Box as="section" id="content-section">
        {authState.state.isAuthenticated ? <LoggedInContent /> : <LoggedOutContent />}
      </Box>

      <DonateButton />
    </>
  );
};

export default ContentSection;
