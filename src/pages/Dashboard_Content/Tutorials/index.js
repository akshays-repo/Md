import React from 'react';
import Dashboard_Content from '..';
import { Card, Space } from 'antd';
import { isMobile } from 'react-device-detect';

const { Meta } = Card;
const Tutorials = () => {
  const tutorialsContent = () => {
    return (
      <div>
        <div className="pageTitle">
          <h4>TUTORIALS</h4>
        </div>
        <div>
          <h5>Videos</h5>
          <div>
              <Space direction={!isMobile ? "horizontal" : "vertical"}>
              <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://via.placeholder.com/250" />}
            >
              <Meta
                title=" Provider section"
                description="Add , Edit , Delete Provider"
              />
            </Card>

            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://via.placeholder.com/250" />}
            >
              <Meta
                title="Patient section"
                description="Add , Edit , Delete Patient"
              />
            </Card>

            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://via.placeholder.com/250" />}
            >
              <Meta
                title="Message section"
                description="Add , Edit , Delete Message"
              />
            </Card>

            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://via.placeholder.com/250" />}
            >
              <Meta
                title="Manage Appointment"
                description="Book Appoinment"
              />
            </Card>
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
