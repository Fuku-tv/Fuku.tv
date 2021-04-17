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
          <button onClick={handleSendChatMessage} className="message-composer__send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameChat;

const discordLink = (
  <div className="link-wrapper">
    <a href="https://discord.com/channels/785224675135455242/785224675135455245" target="_blank" rel="noreferrer">
      discord.gg/fukuTV
    </a>
  </div>
);

const discordLogo = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 272.1">
    <path d="M142.8 120.1c-5.7 0-10.2 4.9-10.2 11s4.6 11 10.2 11c5.7 0 10.2-4.9 10.2-11s-4.6-11-10.2-11zM106.3 120.1c-5.7 0-10.2 4.9-10.2 11s4.6 11 10.2 11c5.7 0 10.2-4.9 10.2-11 .1-6.1-4.5-11-10.2-11z" />
    <path d="M191.4 36.9h-134c-11.3 0-20.5 9.2-20.5 20.5v134c0 11.3 9.2 20.5 20.5 20.5h113.4l-5.3-18.3 12.8 11.8 12.1 11.1 21.6 18.7V57.4c-.1-11.3-9.3-20.5-20.6-20.5zm-38.6 129.5s-3.6-4.3-6.6-8c13.1-3.7 18.1-11.8 18.1-11.8-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.4-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.6-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.2-1.8-1-2.8-1.7-2.8-1.7s4.8 7.9 17.5 11.7c-3 3.8-6.7 8.2-6.7 8.2-22.1-.7-30.5-15.1-30.5-15.1 0-31.9 14.4-57.8 14.4-57.8 14.4-10.7 28-10.4 28-10.4l1 1.2c-18 5.1-26.2 13-26.2 13s2.2-1.2 5.9-2.8c10.7-4.7 19.2-5.9 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.5 0 0-7.9-7.5-24.9-12.6l1.4-1.6s13.7-.3 28 10.4c0 0 14.4 25.9 14.4 57.8 0-.1-8.4 14.3-30.5 15zM303.8 79.7h-33.2V117l22.1 19.9v-36.2h11.8c7.5 0 11.2 3.6 11.2 9.4v27.7c0 5.8-3.5 9.7-11.2 9.7h-34v21.1h33.2c17.8.1 34.5-8.8 34.5-29.2v-29.8c.1-20.8-16.6-29.9-34.4-29.9zm174 59.7v-30.6c0-11 19.8-13.5 25.8-2.5l18.3-7.4c-7.2-15.8-20.3-20.4-31.2-20.4-17.8 0-35.4 10.3-35.4 30.3v30.6c0 20.2 17.6 30.3 35 30.3 11.2 0 24.6-5.5 32-19.9l-19.6-9c-4.8 12.3-24.9 9.3-24.9-1.4zM417.3 113c-6.9-1.5-11.5-4-11.8-8.3.4-10.3 16.3-10.7 25.6-.8l14.7-11.3c-9.2-11.2-19.6-14.2-30.3-14.2-16.3 0-32.1 9.2-32.1 26.6 0 16.9 13 26 27.3 28.2 7.3 1 15.4 3.9 15.2 8.9-.6 9.5-20.2 9-29.1-1.8l-14.2 13.3c8.3 10.7 19.6 16.1 30.2 16.1 16.3 0 34.4-9.4 35.1-26.6 1-21.7-14.8-27.2-30.6-30.1zm-67 55.5h22.4V79.7h-22.4v88.8zM728 79.7h-33.2V117l22.1 19.9v-36.2h11.8c7.5 0 11.2 3.6 11.2 9.4v27.7c0 5.8-3.5 9.7-11.2 9.7h-34v21.1H728c17.8.1 34.5-8.8 34.5-29.2v-29.8c0-20.8-16.7-29.9-34.5-29.9zm-162.9-1.2c-18.4 0-36.7 10-36.7 30.5v30.3c0 20.3 18.4 30.5 36.9 30.5 18.4 0 36.7-10.2 36.7-30.5V109c0-20.4-18.5-30.5-36.9-30.5zm14.4 60.8c0 6.4-7.2 9.7-14.3 9.7-7.2 0-14.4-3.1-14.4-9.7V109c0-6.5 7-10 14-10 7.3 0 14.7 3.1 14.7 10v30.3zM682.4 109c-.5-20.8-14.7-29.2-33-29.2h-35.5v88.8h22.7v-28.2h4l20.6 28.2h28L665 138.1c10.7-3.4 17.4-12.7 17.4-29.1zm-32.6 12h-13.2v-20.3h13.2c14.1 0 14.1 20.3 0 20.3z" />
  </svg>
);

const upArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="chevron-up"
    className="svg-inline--fa fa-chevron-up fa-w-14"
    role="img"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
    />
  </svg>
);

const downArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="chevron-down"
    className="svg-inline--fa fa-chevron-down fa-w-14"
    role="img"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
    />
  </svg>
);
