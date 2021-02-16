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

const AddUsers = props => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
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
  ];

  const addUsers = () => {
    return (
      <div>
        <div>
          <div className="provider-head mr2">
            <Button
              type="primary"
              onClick={() => store.dispatch({ type: 'OPEN_CREATE_USER_MODAL' })}
              className="button-square"
            >
              Create A New User
            </Button>
          </div>
        </div>
        <Table dataSource={props.payload} columns={columns} />
      </div>
    );
  };

  return (
    <div>
      <Dashboard_Content content={addUsers()} />

      <Modal
        title="Create a New User"
        onCancel={() => store.dispatch({ type: 'CLOSE_CREATE_USER_MODAL' })}
        visible={props.modal}
        footer={false}
      >
        <UserCreationForm {...props} />
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
  };
};
const mapDispatchToProps = dispatch => ({
  fetchUser: param => dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_USER', param })),
  addUser: values =>
    dispatch(actionCreator({ method: 'POST', action_type: 'CREATE_USER', values })),
  editUser: (id, values, contentType) =>
    dispatch(actionCreator({ method: 'PUT', action_type: 'EDIT_USER', id, values, contentType })),
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
