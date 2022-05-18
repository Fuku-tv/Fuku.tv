import * as React from 'react';
import { useGameState } from 'src/state/hooks';
import { Box, Button, Flex, Input, Stack, Text } from '@chakra-ui/react';
import SocialMedia from '../SocialMedia/SocialMedia';
import MessageList from './MessageList/MessageList';

const GameChat: React.FC = () => {
  const gameState = useGameState();
  const chatInputRef = React.useRef(null);

  const [chatMessageContent, setChatMessageContent] = React.useState('');

  const [messages, setMessages] = React.useState([]);
  const chatMessageContainerRef = React.useRef(null);

  const handleUpdateChatMessageContent = () => {
    setChatMessageContent(chatInputRef.current.value);
  };

  const handleKeyDown = (event) => {
    console.log(event.key);

    if (event.key === 'Enter') {
      handleSendChatMessage();
    }
  };

  const handleSendChatMessage = () => {
    if (chatMessageContent.length > 0) {
      chatInputRef.current.value = '';
      setChatMessageContent('');
      console.log('SEND MESSAGE', chatMessageContent);
      gameState.actions.sendChatMessage(chatMessageContent);
    }
  };

  React.useEffect(() => {
    console.log('height', chatMessageContainerRef);
    chatMessageContainerRef.current.scrollTo(0, 10000);
    setMessages(gameState.state.chat);
  }, [gameState.state.chat]);

  return (
    <Stack spacing={0} width="100%" height="100%" transition="200ms">
      <Stack
        boxShadow="0px 0px 4px 2px #00000017"
        height="80px"
        background="#34373c"
        spacing={0}
        alignItems="center"
        justifyContent="space-evenly"
        className="game-chat__header"
      >
        <Text fontSize={13}>Keep in touch</Text>
        <SocialMedia />
      </Stack>
      <Box flexGrow={1} height="100%" background="#2e3136" ref={chatMessageContainerRef} overflowY="scroll">
        <MessageList messages={gameState.state.chat} />
      </Box>
      <Flex height="55px" background="rgb(75, 75, 75)" justifyContent="center" alignItems="center" paddingX="20px">
        <Box flexGrow={1}>
          <Input
            border="none"
            backgroundColor="#2d2e31"
            borderRadius="50px"
            paddingX="10px"
            height={8}
            _placeholder={{ color: '#8e8e8e' }}
            ref={chatInputRef}
            fontSize={13}
            onChange={handleUpdateChatMessageContent}
            onKeyDown={handleKeyDown}
            type="text"
            name="message"
            placeholder="Type message"
          />
        </Box>
        <Button
          lineHeight={1}
          fontSize="13px"
          fontWeight={500}
          marginLeft="10px"
          height={8}
          backgroundColor="#7a61a1"
          color="white"
          borderRadius="50px"
          onClick={handleSendChatMessage}
          paddingX="18px"
        >
          Send
        </Button>
      </Flex>
    </Stack>
  );
};

export default GameChat;
