import React from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import { AiOutlinePaperClip } from 'react-icons/ai';

import LeftSideChat from './leftSideChat';
import RightSideChat from './rightSideChat';
import './style.scss';

import { conversationData_PatientA ,conversationData_PatientB } from '../MessageList/chatListDummyData';

const MessageDetail = props => {
  return (
    <div className="chatmain">
      <div className="messagedetail">
        <div className="left">
          <img className="useravatar" src="https://i.pravatar.cc/300" />
        </div>
        <div className="right">
          <span>User Name</span>
          <p>online</p>
        </div>
      </div>
      <div className="chat">
        {conversationData_PatientB.map(data => 
          


            data.senderId === '4c763a46-5490-47d1-b32f-ab66c5edd494' ? 
              <LeftSideChat message={data.message} />
             : 
              <RightSideChat message={data.message} />
            
          
        )}
      </div>

      <div className="message-sentbox">
        <div>
          <label className="paper-clip">
            <AiOutlinePaperClip />
            <input type="file" />
          </label>
        </div>

        <div>
          <input type="text" placeholder="Type something" />{' '}
        </div>

        <div>
          <button className="sent-button">
            {' '}
            <FaTelegramPlane />
          </button>
        </div>
      </div>
    </div>
  );
};
export default MessageDetail;
