import React from 'react';
import { Row, Col } from 'antd';
import Sidebar from './sidebar';

const Dashboard_Content = ({content}) => {
  return (
    <div className="dashboard__content">

      <Row>
      <Col span={6}><Sidebar /></Col>
      <Col span={18}>{content}</Col>
    </Row>
    </div>
  );
};

export default Dashboard_Content;
