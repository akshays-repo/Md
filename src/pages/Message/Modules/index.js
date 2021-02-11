import React, { useEffect, useState } from 'react';
import MessageDetail from './MessageDetail';
import MessageList from './MessageList';
import socketIOClient from 'socket.io-client';
import { Col, message, Row } from 'antd';
import './style.scss';
import { DeliveryStatus } from '_constants/message';
import { connectToSocket, ENDPOINT, socket } from './connectToSocket';

const MessageLayout = () => {
  useEffect(() => {
    connectToSocket();
  });

  const [messageDetails, setMessageDetails] = useState([]);
  const [messageLists, setMessageLists] = useState([]);

  const handleMessageDetails = (messageDetail) => {

    console.log("iiiiiiiiiiiiiiii")
      setMessageDetails(messageDetail)
      console.log("mass da",messageDetail)
  }

  return (
    <div className="message">
      <div className="messagelist">
        <button
          onClick={() =>
            socket.emit('send_message', {
              userUUID: 'c0f636bc-43d2-4b9c-9efb-530426729be5',
              message: 'Hai',
            })
          }
        >
          {' '}
          SEND{' '}
        </button>

        <button
          onClick={() =>
            socket.emit('get_message', { convId: 'ae774049-ad14-4192-bf87-1a23f54dfc82' })
          }
        >
          {' '}
          GET{' '}
        </button>

        <button onClick={() => socket.emit('message_summary', 'Hai hai')}>MESSAGE SUMMARY</button>

        <button onClick={() => socket.emit('test', 'Hai')}>TEST</button>

        <Row>
          <Col xl={8}>
            <MessageList handleMessageDetails={handleMessageDetails} {...messageLists} />
          </Col>
          <Col xl={16}>
            <MessageDetail {...messageDetails} />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default MessageLayout;
