import React from 'react';
import { Table, Tag, Space } from 'antd';
import Dashboard_Content from '..'

const Dashboard_Templates = () =>{
    const columns = [
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Total sent',
          dataIndex: 'totalsent',
          key: 'totalsent',
        },
        {
            title: 'Recipents',
            dataIndex: 'recipents',
            key: 'recipents',
          },
          {
            title: 'Last Updated',
            dataIndex: 'lastupdated',
            key: 'lastupdated',
          },
        
      ];
      
      const data = [
        {
          key: '1',
          name: 'John Brown',
         
        },
        {
          key: '2',
          name: 'Jim Green',
         
        },
        {
          key: '3',
          name: 'Joe Black',
        },
      ];
    const Templates = () =>{
        return(
            <div>
            <Table columns={columns} dataSource={data} />
            </div>
        )
    }
    return <Dashboard_Content content={Templates()} />
}

export default Dashboard_Templates