import React from "react";
import "./style.scss";

const MessageHead = ({
  userId,
  avatar,
  userName,
  lastMessage,
  lastAcive,
  totalUnread,
  active,
  handleMessageDetails,
  messages
}) => {
  console.log("avatar", avatar);
  return (
    <div className="messagehead" onClick={() => handleMessageDetails('hai')}>
      <div className="left">
        <img className="useravatar" src={avatar} />
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
