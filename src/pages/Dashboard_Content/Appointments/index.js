import React from 'react';
import { Space, Card, Row, Col ,Table, Tag, } from 'antd';
import Dashboard_Content from '..';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Appointment Time',
    dataIndex: 'appointment_start',
    key: 'appointment_start',
  },
  {
    title: 'Payment Status',
    dataIndex: 'payment_status',
    key: 'payment_status',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },

];

const Dashboard_Appointments = () => {
  const Appointments = () => {
    return (
      <div className="appointment-section">
      <Table columns={columns}  />
      </div>
    );
  };
  return <Dashboard_Content content={Appointments()} />;
};

export default Dashboard_Appointments;
