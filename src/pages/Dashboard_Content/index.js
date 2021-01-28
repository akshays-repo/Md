import React from 'react';
import { Row, Col } from 'antd';
import Sidebar from './sidebar';

const Dashboard_Content = ({content}) => {
  return (
    <div className="dashboard__content">

      <Row>
      <Col xs={24} xl={6} >
        <div className="leftblock-sidenav">
        <Sidebar />
        </div>
      </Col>
      <Col xs={24} xl={18}>
        <div className="rightblock-content">
        {content}
        </div>
       </Col>
    </Row>
    </div>
  );
};

export default Dashboard_Content;
