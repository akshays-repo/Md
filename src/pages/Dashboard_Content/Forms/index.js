import React, { useEffect , useState} from 'react';
import { Table, Tag, Space, Button, Modal } from 'antd';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';
import Dashboard_Content from '..';
import FormCreation from './formCreaton';
import ViewCreatedForms from './viewCreatedForms';
import { jsPDF } from "jspdf";

import moment from 'moment'
const Dashboard_Forms = props => {

  const [viewId , setViewId] =useState('')
  const [viewDetails , setViewDetails] =useState('')


  useEffect(() => {
    props.fetchForms();
  }, [props.changed]);
  

  const downloadPdf =(e) =>{
    e.preventDefault();
    var doc = new jsPDF();

// I know the proper spelling is colour ;)
doc.setTextColor(100);
doc.text("This is gray.", 20, 20);

doc.setTextColor(150);
doc.text("This is light gray.", 20, 30);

doc.setTextColor(255, 0, 0);
doc.text("This is red.", 20, 40);

doc.setTextColor(0, 255, 0);
doc.text("This is green.", 20, 50);

doc.setTextColor(0, 0, 255);
doc.text("This is blue.", 20, 60);

doc.setTextColor("red");
doc.text("This is red.", 60, 40);

doc.setTextColor("green");
doc.text("This is green.", 60, 50);

doc.setTextColor("blue");
doc.text("This is blue.", 60, 60);


  }

  const viewFormDetails =(e, record) => {
    e.preventDefault();
    setViewDetails(record.response)
    setViewId(record.id)
    console.log("data",record)

    store.dispatch({ type: 'OPEN_EDIT_FORM_MODAL' })

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
    {
      title: 'Submission',
      dataIndex: 'submission',
      key: 'submission',
      render: text => <button className="button-square" onClick= {downloadPdf}>{'Download File'}</button>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <span onClick={(e) => viewFormDetails(e, record)}  className="view-color icon-button">
            <i class="fa fa-eye"></i>
          </span>
        </Space>
      ),
    },
  ];

  const Forms = () => {
    return (
      <div>
        <div className="mb4"> 
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
        <Table columns={columns} dataSource={props.payload} />
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
        <ViewCreatedForms viewDetails={viewDetails} viewId={viewId} {...props} />
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
