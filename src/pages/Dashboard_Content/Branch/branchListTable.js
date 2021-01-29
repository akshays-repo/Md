import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Modal, Button } from 'antd';
import { store } from '../../../reducers/configureStore';

import BranchCreationForm from './branchCreation';

const BranchListTable = props => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState('');
  const openEditModal = (id, data) => {
    setEditId(id);
    setEditData(data);
    store.dispatch({ type: 'OPEN_EDIT_BRANCH_MODAL' });
  };

  useEffect(() => {
    props.fetchBranch({ hospitalId: 3, page: 1, limit: 20 });
  }, [props.modal1]);
  const handleCancel = () => {
    store.dispatch({ type: 'CLOSE_EDIT_BRANCH_MODAL' });
  };
  const columns = [
    {
      title: 'Branch ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Fullname',
      dataIndex: 'fullName',
      key: 'fullName',
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
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '',
      key: 'action',
      render: record => (
        <Space size="middle">
          <button onClick={() => openEditModal(record.id, record)}>Edit</button>
          <button>Delete</button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Modal title="Basic Modal" onCancel={handleCancel} visible={props.modal1} footer={false}>
        {/* <EditBranch id={editId} /> */}
        <BranchCreationForm id={editId} values={editData} {...props} />
      </Modal>
      <div>
        <Space direction="horizontal">
          <button>Filter</button>
        </Space>
      </div>
      <div>
        <Table columns={columns} dataSource={props.data} />
      </div>
    </div>
  );
};
export default BranchListTable;
