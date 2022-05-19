import * as React from 'react';
import { useAuthState } from 'src/state/hooks';

import DonateButton from 'src/components/elements/DonateButton';
import { Box, Stack } from '@chakra-ui/react';
import LoggedOutContent from './LoggedOutContent';
import LoggedInContent from './LoggedInContent/LoggedInContent';

import './ContentSection.scss';

const ContentSection: React.FC = () => {
  const authState = useAuthState();
  return (
    <>
      <Stack
        spacing={0}
        position="relative"
        flexGrow={1}
        height="100%"
        alignItems="center"
        justifyContent="center"
        padding="40px 10px"
        overflowX="hidden"
        background="#111111"
        minHeight="220px"
        as="section"
        overflow="hidden"
        id="content-section"
      >
        {authState.state.isAuthenticated ? <LoggedInContent /> : <LoggedOutContent />}
      </Stack>

      <DonateButton />
    </>
  );
};

export default ContentSection;
