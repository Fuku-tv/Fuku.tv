import * as React from 'react';
import './GameChat.scss';
import { useGameState } from 'src/state/hooks';
import useAuthState from 'src/state/hooks/useAuthState';
import ProfileImage from 'src/components/UIElements/ProfileImage/ProfileImage';
import MessageItem from './MessageItem/MessageItem';
import SocialMedia from '../SocialMedia/SocialMedia';

const GameChat: React.FC = () => {
  const { state, actions } = useAuthState();
  const gameState = useGameState();
  const chatInputRef = React.useRef(null);

  const [chatIsOpen, setChatIsOpen] = React.useState(true);
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

  const header = (
    <div className="game-chat__header">
      <div className="title">Keep in touch</div>
      <SocialMedia />
    </div>
  );

  const noMessagesContent = (
    <div className="no-messages">
      <div>There are currently no messages yet...</div>
      <div>but you can be the first!</div>
    </div>
  );

  const chatMessages = (
    <>
      {gameState.state.chat.map((m, i) => (
        <MessageItem key={Math.random()} index={i} allMessages={messages} message={m.message} userName={m.user} />
      ))}
    </>
  );

  React.useEffect(() => {
    console.log('height', chatMessageContainerRef);
    chatMessageContainerRef.current.scrollTo(0, 10000);
    setMessages(gameState.state.chat);
  }, [gameState.state.chat]);

  return (
    <div className="game-chat-container open" style={{ height: !chatIsOpen ? '70px' : '100%' }}>
      <div className="game-chat__body">
        {header}
        <div ref={chatMessageContainerRef} className="body__messages">
          {gameState.state.chat.length > 0 ? chatMessages : noMessagesContent}
          <div className="message-anchor" />
        </div>
        <div className="body__message-composer">
          <div className="message-composer__message">
            <input
              ref={chatInputRef}
              onChange={handleUpdateChatMessageContent}
              onKeyDown={handleKeyDown}
              type="text"
              name="message"
              placeholder="Type message"
              id="message-composer-input"
            />
          </div>
          <button type="button" onClick={handleSendChatMessage} className="message-composer__send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameChat;
