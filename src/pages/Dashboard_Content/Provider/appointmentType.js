import React, { useEffect, useState } from 'react';
import { Space, Row, Col, Table, Popconfirm, Modal } from 'antd';
import { actionCreator } from '../../../reducers/actionCreator';
import { Form, Input, Select } from 'formik-antd';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { AppointmentTypeSchema } from '../../../_utils/Schemas';
import { store } from '../../../reducers/configureStore';
import { AppointmentTypeForm } from './appointmentTypeForm';

const AppointmentTypes = props => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState('');
  const openEditModal = (id, data) => {
    setEditId(id);
    setEditData(data);
    store.dispatch({ type: 'OPEN_APPOINTMENT_TYPE_MODAL' });
  };

  const handleFormSubmission = async values => {
    try {
      values = JSON.stringify({ ...values, branchId: 3, hospitalId: 3 });
      if (editId) {
        props.editAppointmentType(editId, values);
      } else {
        props.addAppointmentType(values);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Timeslot',
      key: 'time_slot',
      render: record => {
        return <>{record.time_slot} minutes</>;
      },
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
            onConfirm={() => props.deleteAppointmentType(record.id)}
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

  useEffect(() => {
    console.log('Loading');
    props.fetchAppointmentType({ branchId: 3 });
  }, [props.modal, props.deleted]);
  return (
    <div className="appointment-type">
      <div className="header">
        <h2>Appointment types</h2>
        <button
          className="plus-button"
          onClick={() => {
            setEditId(null);
            store.dispatch({ type: 'OPEN_APPOINTMENT_TYPE_MODAL' });
          }}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="defined -field">
        <Table dataSource={props.appointment_type} columns={columns}></Table>
      </div>
      <Modal
        title={editId ? 'EDIT APPOINTMENT TYPE' : 'ADD APPOINTMENT TYPE'}
        onCancel={() => {
          setEditId(null);
          setEditData(null);
          store.dispatch({ type: 'CLOSE_APPOINTMENT_TYPE_MODAL' });
        }}
        visible={props.modal}
        footer={false}
        destroyOnClose
      >
        {editId ? (
          <Formik
            initialValues={editData}
            validationSchema={AppointmentTypeSchema}
            onSubmit={handleFormSubmission}
          >
            <AppointmentTypeForm id={editId} values={editData} {...props} />
          </Formik>
        ) : (
          <Formik
            initialValues={{ name: '', time_slot: 15 }}
            validationSchema={AppointmentTypeSchema}
            onSubmit={handleFormSubmission}
          >
            <AppointmentTypeForm {...props}></AppointmentTypeForm>
          </Formik>
        )}
      </Modal>
    </div>
  );
};

const mapStoreToProps = ({ AppointmentType }) => {
  return {
    appointment_type: AppointmentType.payload,
    modal: AppointmentType.modal,
    deleted: AppointmentType.deleted,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchAppointmentType: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_APPOINTMENT_TYPE', param })),
  addAppointmentType: values =>
    dispatch(
      actionCreator({
        method: 'POST',
        contentType: 'JSON',
        action_type: 'CREATE_APPOINTMENT_TYPE',
        values,
      }),
    ),
  editAppointmentType: (id, values) =>
    dispatch(
      actionCreator({
        method: 'PATCH',
        contentType: 'JSON',
        action_type: 'EDIT_APPOINTMENT_TYPE',
        id,
        values,
      }),
    ),
  deleteAppointmentType: id =>
    dispatch(actionCreator({ method: 'DELETE', action_type: 'DELETE_APPOINTMENT_TYPE', id })),
  filterAppointmentType: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FILTER_APPOINTMENT_TYPE',
        param,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(AppointmentTypes);
