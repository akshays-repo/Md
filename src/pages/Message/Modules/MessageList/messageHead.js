import React from 'react';
import './style.scss';
import Avatar from '../../assets/icons/noimage.png'
import { store } from '../../../../reducers/configureStore';
import { PropertySafetyFilled } from '@ant-design/icons';

const MessageHead = ({
  userId,
  avatar,
  userName,
  lastMessage,
  lastAcive,
  totalUnread,
  active,
  handleMessageDetails,
  messages,
}) => {
  console.log('avatar', avatar);

  const handleMessagehead = (avatar , userName) =>{
    console.log("asdakbf",avatar , userName)
 handleMessageDetails();
    store.dispatch({ type: 'INITIAL_MESSAGE_LOADED' });
    store.dispatch({ type: 'SET_USERNAME', payload: avatar });
    store.dispatch({ type: 'SET_AVATAR', payload: userName });

  }
  return (
    <div className="messagehead" onClick={() => handleMessagehead(avatar, userName)}>
      <div className="left">
        <img className="useravatar" src={avatar ? avatar : Avatar} />
      </div>
      <div className="middle">
        <span>{userName}</span>
        <p>{lastMessage}</p>
      </div>
      <div className="right">
        <div className="lastActive">{lastAcive}</div>

        {totalUnread && <div className="unreadbadge">{totalUnread}</div>}
      </div>
    </div>
  );
};
export default MessageHead;
