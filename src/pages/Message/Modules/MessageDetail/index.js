import React, { useEffect, useRef, useState } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import { AiOutlinePaperClip } from 'react-icons/ai';
import Avatar from '../../assets/icons/noimage.png';
import LeftSideChat from './leftSideChat';
import RightSideChat from './rightSideChat';
import './style.scss';
import _ from 'lodash';
import { socket } from '../connectToSocket';
import { store } from '../../../../reducers/configureStore';
import { isMobile } from 'react-device-detect';

const MessageDetail = props => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const send = () => {
    console.log("props.uuid" , props.uuid ,props.receiverID)
  
    if (message) {
      setMessage('');
      socket.emit('send_message', {
        userUUID: props.receiverID,
        message: message,
      });
    }
    scrollToBottom();
  };

  const onChange = e => {
    setMessage(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      send();
    }
  };
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  };

  useEffect(() => {});
  console.log('props.message', props.message);

  const handleScroll = e => {
    let element = e.target;
    if (element.scrollTop === 0) {
      console.log('Scroll work');
      let lastMessage = _.first(props.message);
      socket.emit('get_messages', {
        conversationId: lastMessage.conversationId,
        lastMessageId: lastMessage.id,
      });

      console.log('Scroll work props', lastMessage);
    }
  };
  return (
    <div className="chatmain">
      <div className="messagedetail">
        <div className="left">
          {isMobile && (
            <span
              onClick={() => {
                store.dispatch({ type: 'GOTO_LIST_PAGE' });
              }}
            >
              <i class="fas fa-arrow-left"></i>
            </span>
          )}
          <img className="useravatar" src={Avatar} />
        </div>
        <div className="right">
          <span>User Name</span>
          <p>online</p>
        </div>
      </div>
      <div className="chat" onScroll={handleScroll}>
        {props.message.length > 0
          ? props.message.map(data =>
              data.senderId === props.uuid ? (
                <LeftSideChat message={data.message} />
              ) : (
                <RightSideChat message={data.message} />
              ),
            )
          : ''}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-sentbox">
        <div>
          <label className="paper-clip">
            <AiOutlinePaperClip />
            <input type="file" />
          </label>
        </div>

        <div>
          <input
            value={message}
            onKeyDown={handleKeyDown}
            onChange={onChange}
            type="text"
            placeholder="Type something"
          />{' '}
        </div>

        <div>
          <button onClick={send} className="sent-button">
            {' '}
            <FaTelegramPlane />
          </button>
        </div>
      </div>
    </div>
  );
};
export default MessageDetail;
