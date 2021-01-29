import React from 'react'
import { Table, Tag, Space ,  Input, Button, Radio, Select , Form } from 'antd';



const columns = [
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Work Hour',
      dataIndex: 'workhour',
      key: 'workhour',
      render: (text, record) => (
        <Space size="middle">
          <button className="edit-button">Edit</button>
        </Space>
      ),
    },
    {
      title: 'Appt Type',
      dataIndex: 'appt',
      key: 'appt',
      render: (text, record) => (
        <Space size="middle">
          <Form>
            <Form.Item label="">
                <Select className="selectBox">
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="demo">Demo</Select.Option>{' '}
                  <Select.Option value="demo">Demo</Select.Option>{' '}
                  <Select.Option value="demo">Demo</Select.Option>{' '}
                  <Select.Option value="demo">Demo</Select.Option>{' '}
                  <Select.Option value="demo">Demo</Select.Option>{' '}
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
          </Form>
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (text, record) => (
        <Space size="middle">

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
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];


const ProviderTable = () =>{
    return(
        <div>
<Table columns={columns} dataSource={data} />
        </div>
    )
}
export default ProviderTable