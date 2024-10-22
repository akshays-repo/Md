import React from 'react';
import Dashboard_Content from '..';
import { Row, Col, Card, Space } from 'antd';
import { isMobile } from 'react-device-detect';

const { Meta } = Card;
const Tutorials = () => {
  const tutorialsContent = () => {
    return (
      <div>
        <div className="pageTitle">
          <h4>TUTORIALS</h4>
        </div>
        <div className="tutorilaSection">
          <h5>Videos</h5>
          <div className="videoBlock">
              <Space direction={!isMobile ? "horizontal" : "vertical"}>
              <Row gutter={16}>
                  <Col xl={6} xs={24}>
              <Card
              hoverable
            
              cover={<img alt="example" src="https://via.placeholder.com/250" />}
            >
              <Meta
                title=" Provider section"
                description="Add , Edit , Delete Provider"
              />
            </Card>
            </Col>
            <Col xl={6} xs={24}>
            <Card
              hoverable
              
              cover={<img alt="example" src="https://via.placeholder.com/250" />}
            >
              <Meta
                title="Patient section"
                description="Add , Edit , Delete Patient"
              />
            </Card>
            </Col>
            <Col xl={6} xs={24}>
            <Card
              hoverable
            
              cover={<img alt="example" src="https://via.placeholder.com/250" />}
            >
              <Meta
                title="Message section"
                description="Add , Edit , Delete Message"
              />
            </Card>
</Col>
<Col xl={6} xs={24}>
            <Card
              hoverable
            
              cover={<img alt="example" src="https://via.placeholder.com/250" />}
            >
              <Meta
                title="Manage Appointment"
                description="Book Appoinment"
              />
            </Card>
            </Col>
            </Row>
              </Space>
           
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Dashboard_Content content={tutorialsContent()} />
    </div>
  );
};

export default Tutorials;
