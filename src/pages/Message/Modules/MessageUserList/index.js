import React from 'react'
import { Table, Tag, Space, Modal, Popconfirm } from 'antd';
import { PropertySafetyFilled } from '@ant-design/icons';
import { connectToSocket, socket } from '../connectToSocket';
import { store } from '../../../../reducers/configureStore';

const MessageUserList = (props) =>{

    console.log("asbdhbf",props.userList )
    const createNewConversation = (uuid , userName , userAvatar) => {
        console.log("asldj",  userName , userAvatar)
    store.dispatch({ type: 'CLOSE_CONVERSATION_LIST_MODAL' })
    store.dispatch({ type: 'INITIAL_MESSAGE_LOADED' });
    store.dispatch({ type: 'CLEAR_MESSAGE' });
    store.dispatch({ type: 'GOTO_DETAIL_PAGE' });
    socket.emit('create_conversation',{userId:uuid})
//TODO:Please note that redux name are changed
    store.dispatch({ type: 'SET_USERNAME' ,  payload: userAvatar});
    store.dispatch({ type: 'SET_AVATAR',  payload: userName});
    store.dispatch({ type: 'SET_RECEIVER_UUID', payload: uuid });

}

    const columns = [
        {
          title: 'User Name',
          key: 'displayName',
          dataIndex: 'displayName',
        },
        {
          title: '',
          key: 'action',
          render: record => (
            <Space size="middle">
              <span className="edit-color icon-button" 
             onClick={() => createNewConversation(record.uuid , record.displayName, record.avatarlocation)}
              >
            <i class="fas fa-comment-dots"></i>
              </span>
            </Space>
          ),
        },
      ];

      return(
          <div>
          <Table dataSource={props.userList}  columns={columns}></Table>

          </div>
      )
    
}

export default MessageUserList