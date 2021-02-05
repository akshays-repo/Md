import React, { useState } from 'react';
import { Table, Tag, Space, Button } from 'antd';

//THIS IS ANT DESIGN TABLE : PLEASE REFER THIS IF YOU STUCKED : https://ant.design/components/table/
const PatientAppointment = () => {
  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Appt Date',
      dataIndex: 'date',
      key: 'date',
    },

    {
      title: 'Purpose',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Paid Amount',
      dataIndex: 'amount',
      key: 'type',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <button className="view-button">View </button>
          <button className="accept-button">Accept</button>
          <button className="delete-button">Cancel </button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      date: '',
      address: 'New York No. 1 Lake Park',
      purpose: '',
      amount: '',
    },
    {
      key: '2',
      name: 'akshays',
      age: 32,
      date: '',
      address: 'new york',
      purpose: 'visit doctor',
      amount: 100,
    },
    {
      key: '6',
      name: 'John Brown',
      age: 32,
      date: '',
      address: 'New York No. 1 Lake Park',
      purpose: '',
      amount: '',
    },
    {
      key: '3',
      name: 'John Brown',
      age: 32,
      date: '',
      address: 'New York No. 1 Lake Park',
      purpose: '',
      amount: '',
    },
  ];
  const [currentButton, setCurrentButton] = useState(1);

  return (
    <div className="table-content">
      <div className="headerButton">
        <Space direction="horizontal">
          <Button className="view-button"
            onClick={() => setCurrentButton(1)}
            style={currentButton === 1 ? { backgroundColor: 'black' } : {}}
            type="primary"
          >
            {' '}
            upcoming
          </Button>
          <Button className="edit-button"
            onClick={() => setCurrentButton(2)}
            style={currentButton === 2 ? { backgroundColor: 'black' } : {}}
            type="primary"
          >
            {' '}
            today
          </Button>
        </Space>
      </div>
      <Table columns={columns} dataSource={data} scroll={{}} />
    </div>
  );
};
export default PatientAppointment;
