import React, { useEffect, useState } from 'react';
import {
  Space,
  Select,
  Row,
  Col,
  Table,
  Tag,
  DatePicker,
  Input,
  Modal,
  Popconfirm,
  Button,
} from 'antd';
import Dashboard_Content from '..';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';

import UserCreationForm from './userCreationFrom';
import { UserDeleteOutlined } from '@ant-design/icons';
const AddUsers = props => {
  useEffect(() => {
    props.fetchUser();
  }, [props.changed]);

  const [editData, setEditData] = useState('');
  const [editId, setEditId] = useState('');


  
  const openEditModal = (id, record) => {
    setEditId(id);
    setEditData(record);
    store.dispatch({ type: 'OPEN_EDIT_USER_MODAL' })
  };

  const columns = [
    {
      title: 'Full Name',
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
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    // {
    //     title: 'Status',
    //     dataIndex: 'status',
    //     key: 'status',
    //   },
    {
      title: '',
      key: 'action',
      render: record => (
        <Space size="middle">
          <span className="edit-color icon-button" onClick={() => openEditModal(record.id, record)}>
            <i className="fa fa-edit"></i>
          </span>
          <Popconfirm
            title="Are you sure？"
            onConfirm={() => props.deleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <span className="delete-color icon-button">
              <i className="fa fa-trash"></i>
            </span>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const addUsers = () => {
    return (
      <div>
           {/* <div className="pageTitle">
          <h4>USERS</h4>
        </div> */}
        <div>
          <div className="provider-head mr2 mb4">
            <Button
              type="primary"
              onClick={() => store.dispatch({ type: 'OPEN_CREATE_USER_MODAL' })}
              className=" view-button"
            >
              Create A New User
            </Button>
          </div>
        </div>
        <Table scroll={{  x: 240 }} dataSource={props.payload} columns={columns} />
      </div>
    );
  };

  return (
    <div>
      {addUsers()} 

      <Modal
        title="Create a New User"
        onCancel={() => store.dispatch({ type: 'CLOSE_CREATE_USER_MODAL' })}
        visible={props.modal}
        footer={false}
        destroyOnClose
      >
        <UserCreationForm {...props} />
      </Modal>

      <Modal
        title="Edit a user"
        onCancel={() => store.dispatch({ type: 'CLOSE_EDIT_USER_MODAL' })}
        visible={props.modal1}
        footer={false}
        destroyOnClose
      >
        <UserCreationForm editId={editId}  editData={editData} {...props} />
      </Modal>
    </div>
  );
};

const mapStoreToProps = ({ Users }) => {
  console.log('state', Users);
  return {
    payload: Users.payload,
    error: Users.error,
    message: Users.message,
    modal: Users.modal,
    modal1: Users.modal1,
    changed:Users.changed
  };
};
const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_USER' })),
  addUser: values =>
    dispatch(actionCreator({ method: 'POST', action_type: 'CREATE_USER', values })),
  editUser: (param, values) =>
    dispatch(actionCreator({ method: 'POST', action_type: 'EDIT_USER', param, values, })),
  deleteUser: id => dispatch(actionCreator({ method: 'DELETE', action_type: 'DELETE_USER', id })),
  filterUser: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FILTER_APPOINTMENT',
        param,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(AddUsers);
