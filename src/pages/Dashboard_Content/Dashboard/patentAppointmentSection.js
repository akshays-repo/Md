import React from 'react';
import { Table, Tag, Space } from 'antd';

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
          <button>View </button>
          <button>Accept</button>
          <button>Cancel </button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      date:'',
      address: 'New York No. 1 Lake Park',
      purpose:"",
      amount:"",

    },
    {
        key: '2',
        name: 'akshays',
        age: 32,
        date:'',
        address: 'new york',
        purpose:"visit doctor",
        amount:100,
  
      },
      {
        key: '6',
        name: 'John Brown',
        age: 32,
        date:'',
        address: 'New York No. 1 Lake Park',
        purpose:"",
        amount:"",
  
      },    {
        key: '3',
        name: 'John Brown',
        age: 32,
        date:'',
        address: 'New York No. 1 Lake Park',
        purpose:"",
        amount:"",
  
      },
  ];

  return (
    <div className="table-content">
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
export default PatientAppointment;
