import React from 'react';
import Sidebar from 'pages/Dashboard_Content/sidebar';
import MessageLayout from './Modules/index';
import { Button, Row, Select, Col } from 'antd';

const MessageMain = () => {
  return (
    <div>

      <Row>
        <Col xl={6}>
        
          <Sidebar />
        </Col>
        <Col xl={18}>
          <MessageLayout />
        </Col>
      </Row>
    </div>
  );
};

export default MessageMain;
