import React, { useState } from 'react';
import { Table, Button, Row, Col, Space, Popconfirm } from 'antd';
import Dashboard_Content from '..';
import PatientCreationForm from './patientCreationForm';
import { Modal } from 'antd';
import { store } from '../../../reducers/configureStore';
import { actionCreator } from '../../../reducers/actionCreator';
import { connect } from 'react-redux';

const Dashboard_MyPatients = props => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState('');
  const openEditModal = (id, data) => {
    setEditId(id);
    setEditData(data);
    store.dispatch({ type: 'OPEN_PATIENT_MODAL' });
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: record => (
        <p>
          {record.firstName} {record.lastName}
        </p>
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
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '',
      key: 'action',
      render: record => (
        <Space size="middle">
          <button className="edit-button" onClick={() => openEditModal(record.id, record)}>
            <i className="fa fa-edit"></i>
          </button>
          <Popconfirm
            title="Are you sure？"
            onConfirm={() => props.deletePatient(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <button className="delete-button">
              <i className="fa fa-trash"></i>
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const MyPatients = () => {
    return (
      <div className="mypatient">
        <div className="search">
          <form className="search-area">
            <input type="text" placeholder="Search by Name or ID" className="form-control" />
            <button className="edit-button button-square">Search</button>
          </form>

          <Button className="edit-button button-square" type="primary" onClick={showModal}>
            Create a New Patient
          </Button>
          <Modal
            title=" Create a New Patient"
            visible={isModalVisible}
            onCancel={handleCancel}
            width={600}
            footer={null}
          >
            <PatientCreationForm />
          </Modal>
        </div>
        <div className="patient_name"></div>
        <Table columns={columns} dataSource={props.patient} />,
      </div>
    );
  };
  return <Dashboard_Content content={MyPatients()} />;
};

const mapStoreToProps = ({ Patient }) => {
  console.log('Store', Patient);
  return {
    patient: Patient.payload,
    modal: Patient.modal,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchPatient: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_PATIENT', param })),
  addPatient: values =>
    dispatch(
      actionCreator({
        method: 'POST',

        action_type: 'CREATE_PATIENT',
        values,
      }),
    ),
  editPatient: (id, values) =>
    dispatch(
      actionCreator({
        method: 'PATCH',
        action_type: 'EDIT_PATIENT',
        id,
        values,
      }),
    ),
  deletePatient: id =>
    dispatch(actionCreator({ method: 'DELETE', action_type: 'DELETE_PATIENT', id })),
  filterPatient: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FILTER_PATIENT',
        param,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard_MyPatients);
