import React from "react";
import { GrAddCircle } from "react-icons/gr";
import { chatList } from "./chatListDummyData";
import MessageHead from "./messageHead";
import "./style.scss";
const MessageList = (props) => {
  console.log(chatList);
  return (
    <div className="messagelist">
      <div className="detail-header">
        {/* <span>chat</span>
        <button className="chatadd-button">
          <GrAddCircle />
        </button> */}
      </div>
      <div className="search-chat">
        <form>
          <input type="text" placeholder={"search.."} className="" />
        </form>
      </div>
      <div className="chatlist">
        {chatList.map((data) => (
          <MessageHead
            userId={data.userId}
            avatar={data.userAvatar}
            userName={data.userName}
            lastMessage={data.lastMessage}
            lastAcive={data.lastMessageTime}
            totalUnread={data.messageUnRead}
            active={data.userActive}
            handleMessageDetails={props.handleMessageDetails}
            messages={data.messageList}
            
          />
        ))}
      </div>
      <div></div>
    </div>
  );
};
export default MessageList;
