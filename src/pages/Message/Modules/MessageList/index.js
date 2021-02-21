import React from 'react';
import { GrAddCircle } from 'react-icons/gr';
import MessageHead from './messageHead';
import { store } from '../../../../reducers/configureStore';
import MessageUserList from '../MessageUserList';
import Modal from 'antd/lib/modal/Modal';
import './style.scss';
const MessageList = props => {
  console.log('Props', props);
  return (
    <div className="messagelist">
      <div className="detail-header">
        <h5>Messages</h5>
        <button style={{cursor:"pointer"}} className="chatadd-button" onClick={()=>store.dispatch({ type: 'OPEN_CONVERSATION_LIST_MODAL' })}>
          <GrAddCircle />
        </button>
      </div>
      <div className="search-chat">
        <form>
          <input type="text" placeholder={'search..'} className="" />
        </form>
      </div>

      <div className="chatlist">
        {props.summary_message.length > 0
          ? props.summary_message.map(data => (
              <MessageHead
                userId={data.userId}
              avatar={ data.senderId === props.uuid ? data.receiverAvatar : data.senderAvatar}
              userName={ data.senderId === props.uuid ? data.receiverDisplayName : data.senderDisplayName}
                lastMessage={data.message}
                lastAcive={data.lastMessageTime}
                totalUnread={data.messageUnRead}
                active={data.userActive}
                handleMessageDetails={() =>
                  props.handleMessageDetails(
                    data.conversationId,
                    '',
                    data.senderId === props.uuid
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



      <Modal
        title="USERS LIST"
        footer={false}
        visible={props.userListModal}
        onCancel={()=>store.dispatch({ type: 'CLOSE_CONVERSATION_LIST_MODAL' })}
        destroyOnClose
      >
        <MessageUserList {...props} />
      </Modal>
    </div>
  );
};
export default MessageList;
