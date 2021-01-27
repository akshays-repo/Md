import React from 'react'

import { Table, Tag, Space } from 'antd';

const BranchListTable = () =>{
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '',
          key: 'action',
          render: () => (
            <Space size="middle">
              <button>edit</button>
              <button>delete</button>
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
    return(

        <div>

<div>
<Space direction="horizontal">
    <button>Filter</button>
</Space>
</div>
            <div>
            <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}
export default BranchListTable