/* eslint-disable react/jsx-props-no-spreading */
import { Box, Spinner } from '@chakra-ui/react';
import React, { Suspense } from 'react';

interface Props {
  component: React.ElementType;
}

const SuspensePage: React.FC<Props> = ({ component: Component, ...rest }) => (
  <Suspense
    fallback={
      <div />
      // <Box display="flex" justifyContent="center" marginY={30}>
      //   <Spinner size="xl" />
      // </Box>
    }
  >
    <Component {...rest} />
  </Suspense>
);
export default SuspensePage;
