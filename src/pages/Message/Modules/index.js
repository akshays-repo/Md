import React, { useEffect, useState } from 'react';
import MessageDetail from './MessageDetail';
import MessageList from './MessageList';
import socketIOClient from 'socket.io-client';
import { Col, message, Row } from 'antd';
import './style.scss';

const MessageLayout = () => {
  const [response, setResponse] = useState('');

  const ENDPOINT = 'https://9294b94ca8db.ngrok.io';

  useEffect(() => {
    connectToSocket();
  });

  const socket = socketIOClient(ENDPOINT);

  const connectToSocket = async () => {
    socket.on('FromAPI', data => {
      setResponse(data);
    });

    console.log('message', response);
    socket.on('connect', () => {
      socket.emit('authenticate', { token: 'key' });
    });

    socket.on('disconnect', () => {
      console.log('message disconnect');
    });

    socket.on('incoming_hospital', data => {
      console.log('message incoming_hospital', data);
    });

    socket.on('authenticate_success', data => {
      console.log('message authenticate_success', data);
    });

    socket.on('message_summary_success', data => {
      console.log('message message_summary_sucess', data);
    });

    socket.on('send_message_success', data => {
      console.log('message send_message_success', data);
    });

    socket.on('get_message_success', data => {
      console.log('message get_message_success', data);
    });

    socket.on('message_delivery_status', data => {
      console.log('message message_delivery_status', data);
    });

    socket.on('message_summary_error', data => {
      console.log('message message_summary_error', data);
    });

    socket.on('get_message_error', data => {
      console.log('message get_message_error', data);
    });

    socket.on('send_message_error', data => {
      console.log('message send_message_error', data);
    });
  };

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
            <MessageList />
          </Col>
          <Col xl={16}>
            <MessageDetail />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default MessageLayout;
