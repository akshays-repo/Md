import React from 'react';
import { Space, Card, Row, Col } from 'antd';
import Dashboard_Content from '..';
const data = [
  {
    name: 'Akshays',
    date: '13/12/21 10:00AM',
    location: 'New York, united states, ',
    emailid: 'akshays@oi.com',
    phone: '+91 2039203940',
  },
  {
    name: 'Akshays',
    date: '13/12/21 10:00AM',
    location: 'New York, united states, ',
    emailid: 'akshays@oi.com',
    phone: '+91 2039203940',
  },
  {
    name: 'Akshays',
    date: '13/12/21 10:00AM',
    location: 'New York, united states, ',
    emailid: 'akshays@oi.com',
    phone: '+91 2039203940',
  },
  {
    name: 'Akshays',
    date: '13/12/21 10:00AM',
    location: 'New York, united states, ',
    emailid: 'akshays@oi.com',
    phone: '+91 2039203940',
  },
  {
    name: 'Akshays',
    date: '13/12/21 10:00AM',
    location: 'New York, united states, ',
    emailid: 'akshays@oi.com',
    phone: '+91 2039203940',
  },
  {
    name: 'Akshays',
    date: '13/12/21 10:00AM',
    location: 'New York, united states, ',
    emailid: 'akshays@oi.com',
    phone: '+91 2039203940',
  },
  {
    name: 'Akshays',
    date: '13/12/21 10:00AM',
    location: 'New York, united states, ',
    emailid: 'akshays@oi.com',
    phone: '+91 2039203940',
  },
];
const Dashboard_Appointments = () => {
  const Appointments = () => {
    return (
      <div className="appointment-section">
        <Space direction="vertical">
          {data.map(item => (
            <Card style={{ width: 1000 }}>
              <Row>
                <Col xl={12}>
                  <p className="title-name"> {item.name}</p>
                  <p className="iconAppt">
                    <i class="far fa-clock "></i>
                    {'  '}
                    {item.date}
                  </p>
                  <p className="iconAppt">
                    <i class="fas fa-map-marker-alt"></i>
                    {'  '}
                    {item.location}
                  </p>
                  <p className="iconAppt">
                    <i class="fas fa-envelope"></i>
                    {'  '}
                    {item.emailid}
                  </p>
                  <p className="iconAppt">
                    <i class="fas fa-phone"></i>
                    {'  '}
                    {item.phone}
                  </p>
                </Col>

                <Col xl={12} className="right-side">
                  <div  >
                    <Space direction="middle">
                      {' '}
                      <button className="view-button">View</button>
                      <button className="accept-button">Accept</button>
                      <button className="delete-button">Cancel</button>
                    </Space>
                  </div>
                </Col>
              </Row>
            </Card>
          ))}
        </Space>
      </div>
    );
  };
  return <Dashboard_Content content={Appointments()} />;
};

export default Dashboard_Appointments;
