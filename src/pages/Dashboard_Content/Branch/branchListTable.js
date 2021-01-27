import React, { useState } from 'react';
import { Table, Tag, Space, Modal, Button } from 'antd';
import EditBranch from './editBranch';

const BranchListTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editId , setEditId] = useState('hyy');
  const openEditModal = (id) => {
      setEditId(id)
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
      render: (record) => (
        <Space size="middle">
          <button onClick={() => openEditModal(record.key)}>edit</button>
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

  return (
    <div>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       <EditBranch id={editId}/>
      </Modal>
      <div>
        <Space direction="horizontal">
          <button>Filter</button>
        </Space>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};
export default BranchListTable;
