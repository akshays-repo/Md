import React from 'react';
import { Row, Col } from 'antd';
import Sidebar from './sidebar';

const Dashboard_Content = ({content}) => {
  return (
    <div className="dashboard__content">

      <Row>
      <Col xs={24} xl={6} ><Sidebar /></Col>
      <Col xs={24} xl={18}>{content}</Col>
    </Row>
    </div>
  );
};

export default Dashboard_Content;
