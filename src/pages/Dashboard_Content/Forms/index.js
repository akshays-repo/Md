import React, { useEffect , useState } from 'react';
import { Table, Tag, Space, Button, Modal } from 'antd';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';
import Dashboard_Content from '..';
import FormCreation from './formCreaton';
import ViewCreatedForms from './viewCreatedForms';
import ViewResponse from './viewResponse'
import Pdf from "react-to-pdf";

import { message } from 'antd';
const ref = React.createRef();

const Dashboard_Forms = props => {

  const [viewId , setViewId] =useState('')
  const [viewDetails , setViewDetails] =useState('')
  const [response , setResponse] = useState("")

useEffect(() => {
  props.fetchForms();
}, [props.changed])

useEffect(() => {
  responseFt();
}, [])
console.log("payload" ,props)

const responseFt = async() => {
  let res = await  props.response();
  setResponse(res.payload.rows)
} 
  const viewFormDetails =(e, record) => {
    e.preventDefault();
    setViewDetails(record.response)
    setViewId(record.id)
    console.log("data",record)

    store.dispatch({ type: 'OPEN_VIEW_RESPONSE_MODAL' })

  }


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone no',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Form Name',
      dataIndex: 'form_name',
      key: 'form_name',
    },
    // {
    //   title: 'Submission',
    //   dataIndex: 'submission',
    //   key: 'submission',
    //   render: text => <button  className="view-button button-square"
    //   type="primary" >{' Download File '}</button>,
    // },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <button className="view-button icon-button button-square" onClick={(e) => viewFormDetails(e, record)}>
            <i class="fa fa-eye"></i>{' View File '}
          </button>
        </Space>
      ),
    },
  ];

  const Forms = () => {
    return (
      <div>
             <div className="pageTitle">
          <h4>FORMS</h4>
        </div>
        <div className="mb5">
          <Space direction="horizontal">
            <Button
              className="view-button button-square"
              type="primary"
              onClick={() => store.dispatch({ type: 'OPEN_CREATE_FORM_MODAL' })}
            >
              Create a New From
            </Button>
            <Button
              className="edit-button button-square"
              type="primary"
              onClick={() => store.dispatch({ type: 'OPEN_EDIT_FORM_MODAL' })}
            >
View Form            </Button>
          </Space>
        </div>
        <Table columns={columns} dataSource={response} />
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

      <Modal
        title="Forms"
        visible={props.modal3}
        footer={false}
        onCancel={() => store.dispatch({ type: 'CLOSE_VIEW_RESPONSE_MODAL' })}
        destroyOnClose
      >
        <ViewResponse viewDetails={viewDetails} viewId={viewId} {...props} />
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
    modal3: Forms.modal3,

    changed: Forms.changed,
    formResponse:Forms.formResponse,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchForms: () => dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_FORM' })),


  response: () => dispatch(actionCreator({ method: 'GET', action_type: 'GET_RESPONSE' })),

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
