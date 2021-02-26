import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Modal, Button, Popconfirm, Dropdown, Select } from 'antd';
import { store } from '../../../reducers/configureStore';
import Menu from 'components/Menu';

import BranchCreationForm from './branchCreation';
import { getFormData } from '../../../_utils';
import { DownOutlined } from '@ant-design/icons';
const menuItems = [
  {
    key: 'active',
    title: 'Active',
  },
  {
    key: 'hold',
    title: 'Hold',
  },
];

const BranchListTable = props => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState('');

  const openEditModal = (id, data) => {
    setEditId(id);
    setEditData(data);
    store.dispatch({ type: 'OPEN_EDIT_BRANCH_MODAL' });
  };

  useEffect(() => {
    props.fetchBranch();
  }, [props.Branch]);

  const handleCancel = () => {
    setEditId(null);
    store.dispatch({ type: 'CLOSE_EDIT_BRANCH_MODAL' });
  };

  const handleMenuClick = async( e , id , data) => {
    const sendingData = {
      userTypeId: 3
    }
    const values = await getFormData({ ...sendingData});
    props.editBranch(id,values, {status: e});
  };
  const menu = <Menu items={menuItems} onClick={handleMenuClick} />;

  const columns = [
    {
      title: 'Fullname',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Emaill',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',

      render: (text, record) => {
        return (
          <Space size="middle">
            <Select className="holdActive"
              style={record.status === 'active' ? { color: 'green' } : { color: 'red' }}
              value={record.status}
              onChange={e => {
                setEditId(record.id);
                setEditData(record);
                handleMenuClick(e , record.id , record);
              }}
            >
              <Select.Option style={{ color: 'green' }} value="active">
                Active
              </Select.Option>
              <Select.Option style={{ color: 'red' }} value="hold">
                Hold
              </Select.Option>
            </Select>
          </Space>
        );
      },
    },
    {
      title: '',
      key: 'action',
      render: record => (
        <Space size="middle">
          <span className="edit-color icon-button" onClick={() => openEditModal(record.id, record)}>
            <i className="fa fa-edit"></i>
          </span>

          {/* <Popconfirm
            title="Are you sure？"
            onConfirm={() => props.deleteBranch(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <button className="delete-button">Delete</button>
          </Popconfirm> */}
        </Space>
      ),
    },
  ];

  return (
    <div>
      {editId && (
        <Modal
          title="Edit branch details"
          onCancel={handleCancel}
          visible={props.modal1}
          footer={false}
          destroyOnClose
        >
          <BranchCreationForm id={editId} values={editData} {...props} />
        </Modal>
      )}
      {/* <div>
        <Space direction="horizontal">
          <button>Filter</button>
        </Space>
      </div> */}
      <div>
        <Table  scroll={{  x: 240 }} columns={columns} dataSource={props.data} />
      </div>
    </div>
  );
};
export default BranchListTable;
