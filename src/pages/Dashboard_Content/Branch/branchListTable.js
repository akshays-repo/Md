import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Modal, Button, Popconfirm, Dropdown } from 'antd';
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
    store.dispatch({ type: 'CLOSE_EDIT_BRANCH_MODAL' });
  };

  const handleMenuClick = async e => {
    const values = await getFormData({ ...editData, userTypeId: 3, status: e.key });
    props.editBranch(editId, values);
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
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',

      render: (text, record) => {
        console.log('Record', record);
        let badge = 'badge-success';
        if (record.status === 'hold') badge = 'badge-danger';
        return (
          <Dropdown
            overlay={menu}
            // ref={this.clickId}
            id={record.id}
            onClick={() => {
              setEditId(record.id);
              setEditData(record);
            }}
            trigger={['click']}
          >
            <span className={`font-size-12 badge ${badge} 'badgeText'`}>
              {text == 'active' ? 'Active' : 'Hold'} &nbsp;
              <DownOutlined />
              {/* <Icon type="down" /> */}
            </span>
          </Dropdown>
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
      <Modal
        title="Edit branch details"
        onCancel={handleCancel}
        visible={props.modal1}
        footer={false}
      >
        <BranchCreationForm id={editId} values={editData} {...props} />
      </Modal>
      {/* <div>
        <Space direction="horizontal">
          <button>Filter</button>
        </Space>
      </div> */}
      <div>
        <Table columns={columns} dataSource={props.data} />
      </div>
    </div>
  );
};
export default BranchListTable;
