import React from 'react'
import { Table, Tag, Space, Modal, Popconfirm } from 'antd';
import { PropertySafetyFilled } from '@ant-design/icons';
import { connectToSocket, socket } from '../connectToSocket';
import { store } from '../../../../reducers/configureStore';

const MessageUserList = (props) =>{

    console.log("asbdhbf",props.userList )
    const createNewConversation = (uuid) => {
        console.log("asldj", uuid)
    store.dispatch({ type: 'CLOSE_CONVERSATION_LIST_MODAL' })
    store.dispatch({ type: 'INITIAL_MESSAGE_LOADED' });
    store.dispatch({ type: 'CLEAR_MESSAGE' });
    store.dispatch({ type: 'GOTO_DETAIL_PAGE' });
    socket.emit('create_conversation',{userId:uuid})
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
             onClick={() => createNewConversation(record.uuid)}
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