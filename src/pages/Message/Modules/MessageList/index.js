import React from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { chatList } from './chatListDummyData';
import MessageHead from './messageHead';
import './style.scss';
const MessageList = props => {
  console.log('Props', props);
  return (
    <div className="messagelist">
      <div className="detail-header">
        <h5>Messaage</h5>
        {/* <button className="chatadd-button">
          <GrAddCircle />
        </button> */}
      </div>
      <div className="search-chat">
        <form>
          <input type="text" placeholder={'search..'} className="" />
        </form>
      </div>
      {/* conversationId: "ac78b49e-a9c6-46ee-aa57-61d47b5af756" createdAt: "2021-02-06T16:55:13.000Z"
      id: 20 message: "Sure dispatching to your location." recieverId:
      "a2ed9b2e-1ede-4a25-960e-481d53068c66" senderId: "4c763a46-5490-47d1-b32f-ab66c5edd494"
      status: "sent" */}
      <div className="chatlist">
        {props.summary_message.length > 0
          ? props.summary_message.map(data => (
              <MessageHead
                userId={data.userId}
                avatar={data.userAvatar}
                userName={data.receiverId}
                lastMessage={data.message}
                lastAcive={data.lastMessageTime}
                totalUnread={data.messageUnRead}
                active={data.userActive}
                handleMessageDetails={() =>
                  props.handleMessageDetails(
                    data.conversationId,
                    '',
                    data.senderId === '4c763a46-5490-47d1-b32f-ab66c5edd494'
                      ? data.recieverId
                      : data.senderId,
                  )
                }
                messages={data.messageList}
              />
            ))
          : 'Please Start to Message'}
      </div>
      <div></div>
    </div>
  );
};
export default MessageList;
