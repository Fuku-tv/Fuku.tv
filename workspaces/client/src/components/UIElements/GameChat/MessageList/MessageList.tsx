import React from 'react';
import MessageItem from '../MessageItem/MessageItem';

type Props = {
  messages: Array<{ message: string; user: string; picture?: string }>;
};

const MessageList: React.FC<Props> = ({ messages }) => (
  <>
    {messages.map((message) => (
      <MessageItem key={Math.random()} picture={message.picture} message={message.message} userName={message.user} />
    ))}
  </>
);

export default MessageList;
