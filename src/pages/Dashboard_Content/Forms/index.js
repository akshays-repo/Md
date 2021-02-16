import React from 'react';
import { Table, Tag, Space } from 'antd';
import Dashboard_Content from '..'

const Dashboard_Forms = () =>{
    const columns = [
        {
          title: 'Patient',
          dataIndex: 'patient',
          key: 'patient',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Submission',
          dataIndex: 'submission',
          key: 'submission',
          render:text => <a>{'Download File'}</a>,
        },
        {
          title: 'Action',
          key: 'action',
          render: () => (
            <Space size="middle">
              <span className="view-color icon-button">
              <i class="fa fa-eye"></i>
              </span>
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
      
    const Forms = () =>{
        return(
            <div>
           <Table  columns={columns} dataSource={data} />
            </div>
        )
    }
    return <Dashboard_Content content={Forms()} />
}

export default Dashboard_Forms