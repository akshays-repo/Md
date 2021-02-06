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
}) => {
  console.log("avatar", avatar);
  return (
    <div className="messagehead">
      <div className="left">
        <img className="useravatar" src={avatar} />
      </div>
      <div className="middle">
        <span>{userName}</span>
        <p>{lastMessage}</p>
      </div>
      <div className="right">
        <span>{lastAcive}</span>
        <br />
        {totalUnread && <span className="unreadbadge">{totalUnread}</span>}
      </div>
    </div>
  );
};
export default MessageHead;
