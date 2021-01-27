import React from 'react';
import Dashboard_Content from '..';
import { Tabs, Table, Tag, Space } from 'antd';
const { TabPane } = Tabs;

const Dashboard_Campaigns = () => {
  function callback(key) {
    console.log(key);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Total Sent',
      dataIndex: 'totalsent',
      key: 'totalsent',
    },
    {
      title: 'Booking Date',
      dataIndex: 'bookingdate',
      key: 'bookingdate',
    },
    {
      title: 'Recipents',
      dataIndex: 'recipents',
      key: 'recipents',
    },
    {
      title: 'Open rate',
      dataIndex: 'openrate',
      key: 'openrate',
    },
    {
      title: 'status',
      key: 'status',
      dataIndex: 'status',
      render: status => (
        <Tag color={status == 'confirm' ? 'green' : 'red'} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Last updated',
      dataIndex: 'lastupdated',
      key: 'lastupdated',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>edit</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  const Campaigns = () => {
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="All" key="1" />
          <TabPane tab="Sent" key="2" />
          <TabPane tab="Sheduled" key="3" />
          <TabPane tab="Draft" key="4" />
          <TabPane tab="Archived" key="5" />
          <TabPane tab="Reuse" key="6" />
        </Tabs>

        <div>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    );
  };
  return <Dashboard_Content content={Campaigns()} />;
};

export default Dashboard_Campaigns;
