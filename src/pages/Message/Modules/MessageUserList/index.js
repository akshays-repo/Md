import React from 'react'
import { Table, Tag, Space, Modal, Popconfirm } from 'antd';
import { PropertySafetyFilled } from '@ant-design/icons';
import { connectToSocket, socket } from '../connectToSocket';

const MessageUserList = (props) =>{

    console.log("asbdhbf",props.userList )
    const createNewConversation = (uuid) => {
    socket.emit('create_conversation',{userId: uuid});
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