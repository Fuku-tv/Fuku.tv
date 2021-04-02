import * as React from 'react';
import './MessageItem.scss';
// import {ReactComponent as DownArrow} from 'src/shared/icons/downArrow.svg';
// import { ReactComponent as UpArrow } from 'src/shared/icons/upArrow.svg';
// import useAuthState from 'src/state/hooks/useAuthState';
import ProfileImage from 'src/components/UIElements/ProfileImage/ProfileImage';

interface MESSAGE_ARRAY {
  message: string;
}

interface PROPS {
  picture: string;
  name: string;
  messages: MESSAGE_ARRAY;
}

const MessageItem: React.FC<PROPS> = ({ picture, name, messages }) => {
  const [messageList, setMessageList] = React.useState([]);
  // React.useEffect(() => {
  //   setMessageList(props.messages);
  // }, [props.messages]);
  return (
    <div className="message-item-row">
      <div className="message-item-wrapper">
        <ProfileImage image={picture} size={24} />
        <div className="message-item__message-container">
          <div className="message__title">{name}</div>
          {messages.map((m, i) => (
            <div key={Math.random()} className="message-item">
              <div className="message__message-content">{m}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
