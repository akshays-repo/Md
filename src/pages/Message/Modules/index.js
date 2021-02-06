import React, { useEffect, useState } from 'react';
import MessageHeader from '../Components/Header';
import MessageDetail from './MessageDetail';
import MessageList from './MessageList';
import socketIOClient from 'socket.io-client';
import { Col, Row, } from 'antd';
import './style.scss';

const MessageLayout = () => {
  const [response, setResponse] = useState('');

  const ENDPOINT = 'https://fe41647bc7c4.ngrok.io';

  useEffect(() => {
    connectToSocket();
  });

  const connectToSocket = async () => {
    const socket = socketIOClient(ENDPOINT);
     socket.on('FromAPI', data => {
      setResponse(data);
    });
    console.log("message", response)
    socket.on('connect', () => {
      socket.emit('authenticate', {token:"key"});
    });
     socket.on('disconnect', ()=>{
       console.log("message disconnect")
     })
     socket.on('incoming_hospital', (data)=>{
      console.log("message incoming_hospital", data)
    })
  };

  return (
    <div className="message">
      <div className="messagelist">
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
