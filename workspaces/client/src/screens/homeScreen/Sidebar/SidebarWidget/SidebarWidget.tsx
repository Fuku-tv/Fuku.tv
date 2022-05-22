import { Box, Flex, Heading, HStack } from '@chakra-ui/react';
import * as React from 'react';

interface Props {
  children: React.ReactNode;
  title: string;
  header?: React.ReactNode;
  fullHeight?: boolean;
}

/**
 *
 * @param props
 * @returns
 */
const SidebarWidget: React.FC<Props> = (props) => (
  <Flex flexDirection="column" width="100%" height={props.fullHeight ? '100%' : 'initial'}>
    <HStack justifyContent="space-between">
      <Heading as="h3" fontSize="14px" fontWeight={400} className="title">
        {props.title}
      </Heading>
      {props.header}
    </HStack>
    <Box flexGrow={1} marginTop="5px" backgroundColor="#2e3136" borderRadius={4} overflow="hidden">
      {props.children}
    </Box>
  </Flex>
);

export default SidebarWidget;
