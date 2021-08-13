import * as React from 'react';
// import {ReactComponent as DownArrow} from 'src/shared/icons/downArrow.svg';
// import { ReactComponent as UpArrow } from 'src/shared/icons/upArrow.svg';
import useAuthState from 'src/state/hooks/useAuthState';
import ProfileImage from 'src/components/UIElements/ProfileImage/ProfileImage';
import styles from './MessageItem.module.scss';

interface PROPS {
  picture?: string;
  userName: string;
  message: string;
  allMessages: Array[];

  index: number;
}

const MessageItem: React.FC<PROPS> = ({ picture, userName, message, allMessages, index }) => {
  const [messageList, setMessageList] = React.useState([]);
  const { state, actions } = useAuthState();
  // React.useEffect(() => {
  //   setMessageList(props.messages);
  // }, [props.messages]);

  React.useEffect(() => {
    console.log('prev', userName);
  }, [userName]);

  const messageName = <div className="message__title">{userName}</div>;
  return (
    <div className={`message-item-row ${state.nickname === userName && 'outgoing'}`}>
      <div className="message-item-wrapper">
        <ProfileImage image={picture} size={24} />
        <div className="message-item__message-container">
          {messageName}

          <div className="message-item">
            <div className="message__message-content">{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
