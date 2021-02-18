import React, { useEffect } from 'react';
import { Table, Tag, Space, Button, Modal } from 'antd';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';
import Dashboard_Content from '..';
import FormCreation from './formCreaton';
import ViewCreatedForms from './viewCreatedForms';
const Dashboard_Forms = props => {
  useEffect(() => {
    props.fetchForms();
  }, [props.changed]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Submission',
      dataIndex: 'submission',
      key: 'submission',
      render: text => <a>{'Download File'}</a>,
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

  const Forms = () => {
    return (
      <div>
        <div>
          <Space direction="horizontal">
            <Button
              className="view-button button-square"
              type="primary"
              onClick={() => store.dispatch({ type: 'OPEN_CREATE_FORM_MODAL' })}
            >
              Create a New From
            </Button>
            <Button
              className="view-button button-square"
              type="primary"
              onClick={() => store.dispatch({ type: 'OPEN_EDIT_FORM_MODAL' })}
            >
              View,  Edit, Share Forms
            </Button>
          </Space>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  };
  return (
    <div>
      <Modal
        title="Create New Forms"
        visible={props.modal}
        footer={false}
        onCancel={() => store.dispatch({ type: 'CLOSE_CREATE_FORM_MODAL' })}
        destroyOnClose
      >
        <FormCreation {...props} />
      </Modal>
      <Modal
        title="Forms"
        visible={props.modal1}
        footer={false}
        onCancel={() => store.dispatch({ type: 'CLOSE_EDIT_FORM_MODAL' })}
        destroyOnClose
      >
        <ViewCreatedForms {...props} />
      </Modal>

      <Dashboard_Content content={Forms()} />
    </div>
  );
};

const mapStoreToProps = ({ Forms }) => {
  console.log('state', Forms);
  return {
    payload: Forms.payload,
    error: Forms.error,
    message: Forms.message,
    modal: Forms.modal,
    modal1: Forms.modal1,
    modal2: Forms.modal2,
    changed: Forms.changed,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchForms: () => dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_FORM' })),
  addForms: (values, contentType) =>
    dispatch(actionCreator({ method: 'POST', action_type: 'CREATE_FORM', values, contentType })),
  editForms: (id, values ,contentType) =>
    dispatch(actionCreator({ method: 'PUT', action_type: 'EDIT_FORM', id, values ,contentType})),
  deleteForms: id => dispatch(actionCreator({ method: 'DELETE', action_type: 'DELETE_FORM', id })),
  filterForms: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FILTER_APPOINTMENT',
        param,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard_Forms);
