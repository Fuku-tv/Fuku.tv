import React from 'react';

const ChatWidget: React.FC = (props) => (
  <div style={{ height: 500 }}>
    <iframe
      title="Chat widget"
      src="https://titanembeds.com/embed/785224675135455242?defaultchannel=797625753289883688&scrollbartheme=minimal&theme=DiscordDark"
      height="100%"
      width="100%"
      frameBorder="0"
    />
  </div>
);

export default ChatWidget;
