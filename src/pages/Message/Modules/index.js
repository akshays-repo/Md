import React, { useEffect, useState } from 'react';
import MessageDetail from './MessageDetail';
import MessageList from './MessageList';
import socketIOClient from 'socket.io-client';
import { Col, message, Row, Result, Button } from 'antd';
import './style.scss';
import { DeliveryStatus } from '_constants/message';
import { connectToSocket, ENDPOINT, socket } from './connectToSocket';
import { connect } from 'react-redux';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import { isMobile } from 'react-device-detect';

const MessageLayout = props => {
  useEffect(() => {
    connectToSocket();
  }, []);

  const [messageDetails, setMessageDetails] = useState([]);
  const [messageLists, setMessageLists] = useState([]);
  const [receiverId, setReceiverId] = useState();

  const handleMessageDetails = (conversationId, lastMessageId = '', receiverID , userAvatar , userName) => {
    store.dispatch({ type: 'CLEAR_MESSAGE' });
    store.dispatch({ type: 'GOTO_DETAIL_PAGE' });

    store.dispatch({ type: 'SET_USERNAME' ,  payload: userName});
    store.dispatch({ type: 'SET_AVATAR',  payload: userAvatar});

    setReceiverId(receiverID);
    socket.emit('get_messages', {
      conversationId: conversationId,
      lastMessageId: parseInt(lastMessageId),
    });
  };

  const intialLoading = (
    <Result
      status="success"
      title="Welcome To Fossil Md Messages"
      subTitle="Please Start to Message Your Clients "
    />
  );

  return (
    <div className="message">
      <div className="">
        {/* THIS IS FOR THE DESKTOP SECTION   */}
        {/* PLEASE NOTE IF YOU MADE ANY CHANGES FOR THE DESKTOP COMPONENTS DO SAME FOR THE MOBILE ALSO */}
        {!isMobile && (
          <Row>
            <Col xl={8} xs={24} className="col-border">
              <MessageList
                {...props}
                handleMessageDetails={handleMessageDetails}
                {...messageLists}
              />
            </Col>
            <Col xl={16} xs={24} style={{minHeight:"100vh"}}>
              {props.initialLoading ? (
                intialLoading
              ) : (
                <MessageDetail {...messageDetails} {...props} receiverID={receiverId} />
              )}
            </Col>
          </Row>
        )}

        {/* THIS IS FOR THE MOBILE SECTION */}
        {/* PLEASE NOTE IF YOU MADE ANY CHANGES FOR THE MOBILE COMPONENTS DO SAME FOR THE DESKTOP ALSO */}
        {isMobile && (
          <Row>
            <Col xs={24} className="col-border" >
              {props.mobileListScreen === true && (
                <MessageList
                  {...props}
                  handleMessageDetails={handleMessageDetails}
                  {...messageLists}
                />
              )}
              {props.mobileListScreen === false && (
                <div>
                  {props.initialLoading ? (
                    intialLoading
                  ) : (
                    <MessageDetail {...messageDetails} {...props} receiverID={receiverId} />
                  )}
                </div>
              )}
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

const mapStoreToProps = ({ SummaryMessage, Message }) => {
  return {
    summary_message: SummaryMessage.payload.length > 0 ? SummaryMessage.payload : [],
    message: Message.payload.length > 0 ? Message.payload : [],
    initialLoading: Message.initalLoading,
    mobileListScreen: Message.mobileListScreen,
    uuid:Message.uuid,
    receiverAvatar:Message.receiverAvatar,
    receiverDisplayName:Message.receiverDisplayName,
    userList:Message.userList,
    userListModal:Message.userListModal




  };
};
const mapDispatchToProps = dispatch => ({
  fetchSummary: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_SCHEDULE', ...id })),
});

export default connect(mapStoreToProps, mapDispatchToProps)(MessageLayout);
