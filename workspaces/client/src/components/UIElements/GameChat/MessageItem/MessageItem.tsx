import * as React from 'react';
import useAuthState from 'src/state/hooks/useAuthState';
import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react';

interface Props {
  picture?: string;
  userName: string;
  message: string;
}

const MessageItem: React.FC<Props> = ({ picture, userName, message }) => {
  const { state } = useAuthState();

  const isOutgoingMessage = state.nickname === userName;

  return (
    <Flex color="#222" textAlign="left" justifyContent={isOutgoingMessage ? 'flex-end' : 'flex-start'}>
      <Flex flexDirection={isOutgoingMessage ? 'row-reverse' : 'row'} width="100%" alignItems="flex-end" padding={2}>
        <Avatar margin={isOutgoingMessage ? '0 0 0 6px' : '0 6px 0 0'} src={picture} boxSize={6} />
        <Stack spacing="5px" width="74%">
          <Text fontSize="11px" color="white" fontWeight={500}>
            {userName}
          </Text>

          <Box background="#fafafa" borderRadius="2px" padding="3px">
            <Text fontSize={11} lineHeight={4} fontWeight={500} overflowWrap="break-word">
              {message}
            </Text>
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default React.memo(MessageItem);
