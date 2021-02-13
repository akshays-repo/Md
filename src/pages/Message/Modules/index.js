import React, { useEffect, useState } from 'react';
import MessageDetail from './MessageDetail';
import MessageList from './MessageList';
import socketIOClient from 'socket.io-client';
import { Col, message, Row } from 'antd';
import './style.scss';
import { DeliveryStatus } from '_constants/message';
import { connectToSocket, ENDPOINT, socket } from './connectToSocket';
import { connect } from 'react-redux';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';

const MessageLayout = props => {
  useEffect(() => {
    connectToSocket();
  }, []);

  const [messageDetails, setMessageDetails] = useState([]);
  const [messageLists, setMessageLists] = useState([]);
  const [receiverId, setReceiverId] = useState();
  const handleMessageDetails = (conversationId, lastMessageId = '', receiverID) => {
    console.log('Conversation ID', conversationId);
    console.log('Conversation ID', receiverID);
    store.dispatch({ type: 'CLEAR_MESSAGE' });

    console.log('iiiiiiiiiiiiiiii');
    setReceiverId(receiverID);
    socket.emit('get_messages', {
      conversationId: conversationId,
      lastMessageId: lastMessageId,
    });
  };

  return (
    <div className="message">
      <div className="messagelist">
        {/* <button
          onClick={() =>
            socket.emit('send_message', {
              userUUID: 'c0f636bc-43d2-4b9c-9efb-530426729be5',
              message: 'Hai',
            })
          }
        >
          SEND
        </button>
        <button
          onClick={() =>
            socket.emit('get_message', { convId: 'ae774049-ad14-4192-bf87-1a23f54dfc82' })
          }
        >
          GET
        </button>
        <button onClick={() => socket.emit('message_summary', 'Hai hai')}>MESSAGE SUMMARY</button>
        <button onClick={() => socket.emit('test', 'Hai')}>TEST</button> */}
        <Row>
          <Col xl={8}>
            <MessageList {...props} handleMessageDetails={handleMessageDetails} {...messageLists} />
          </Col>
          <Col xl={16}>
            <MessageDetail {...messageDetails} {...props} receiverID={receiverId} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

const mapStoreToProps = ({ SummaryMessage, Message }) => {
  return {
    summary_message: SummaryMessage.payload.length > 0 ? SummaryMessage.payload : [],
    message: Message.payload.length > 0 ? Message.payload : [],
  };
};
const mapDispatchToProps = dispatch => ({
  fetchSummary: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_SCHEDULE', ...id })),
});

export default connect(mapStoreToProps, mapDispatchToProps)(MessageLayout);
