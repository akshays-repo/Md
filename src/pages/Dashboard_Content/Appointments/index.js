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
      <div>
        <Space direction="vertical">
          {data.map(item => (
            <Card style={{ width: 1000 }}>
              <Row>
                <Col>
                  <p> {item.name}</p>
                  <p>
                    <i class="far fa-clock "></i>
                    {'  '}
                    {item.date}
                  </p>
                  <p>
                    <i class="fas fa-map-marker-alt"></i>
                    {'  '}
                    {item.location}
                  </p>
                  <p>
                    <i class="fas fa-envelope"></i>
                    {'  '}
                    {item.emailid}
                  </p>
                  <p>
                    <i class="fas fa-phone"></i>
                    {'  '}
                    {item.phone}
                  </p>
                </Col>

                <Col>
                  <span style={{ float: 'right' }}>
                    <Space direction="middle">
                      {' '}
                      <button>View</button>
                      <button>Accept</button>
                      <button>Cancel</button>
                    </Space>
                  </span>
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
