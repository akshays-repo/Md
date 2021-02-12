import React, { useEffect, useState } from 'react';
import {
  Space,
  Button,
  Select,
  Table,
  Popconfirm,Modal
} from 'antd';
import Dashboard_Content from '..';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';
import moment from 'moment';
import AppointmentView from '../Appointments/appointmentView';
import AppointmentEdit from '../Appointments/appointmentView';


const { Option } = Select;
//THIS IS ANT DESIGN TABLE : PLEASE REFER THIS IF YOU STUCKED : https://ant.design/components/table/
const PatientAppointment = props => {
  const [currentButton, setCurrentButton] = useState(1);
  const handleChangePaymentStatus = () => {};
  
  const handleChangeStatus = async (id, status) => {
    props.editStatusAppointment(id, { status });
  };

  useEffect(() => {
    props.fetchAppointmentHome({  toDate: moment().format('L') });
  }, [props.changed]);


  const getUpComing = () =>{
    setCurrentButton(2)
    props.fetchAppointmentHome({  toDate: moment().format('L') })
  }
  const getToday =() =>{
    setCurrentButton(1)
    props.fetchAppointmentHome({ fromDate: moment().format('L'), toDate: moment().format('L')})
  }


  const viewAppointmentDetails = async id => {
    await props.viewAppointment(id);
    store.dispatch({ type: 'OPEN_VIEW_APPOINTMENT_MODAL' });
  };


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
    {
      title: 'Appointment Date',
      dataIndex: 'appointment_start',
      key: 'appointment_start',
      render: record => <span> {moment(record.appointment_start).format('MMM Do YYYY')} </span>,
    },
    {
      title: 'Payment Status',
      dataIndex: '',
      key: '',
      render: record => (
        <div>
          <Select
              defaultValue={record.payment_status}
              style={{ width: 120 }}
              onChange={e => handleChangePaymentStatus(record.id, e)}
              className={record.payment_status}
            >
              <Option className={"pending"}  value="pending">Pending</Option>
              <Option className={"failed"}  value="failed">Failed</Option>
              <Option className={"paid"}  value="paid">Paid</Option>
              <Option className={"requested"}  value="requested">Requested</Option>
              <Option className={"manually_paid"}  value="manually_paid">Manually Paid</Option>
            </Select>
        </div>
      ),
    }, //['pending', 'failed', 'paid', 'requested', 'manually_paid'
    {
      title: 'Status',
      dataIndex: '',
      key: '',
      render: record => (
        <div>
         <Select
              defaultValue={record.status}
              style={{ width: 120 }}
              className={record.status}
              onChange={e => handleChangeStatus(record.id, e)}
            >
              <Option   className={"pending"}  value="pending">Pending</Option>
              <Option   className={"confirmed"}  value="confirmed">Confirmed</Option>
              <Option   className={"cancelled"}  value="cancelled">Cancelled</Option>
              <Option   className={"completed"} value="completed">Completed</Option>
            </Select>
        </div>
      ),
    },
    {
      title: '',
      key: 'action',
      render: record => (
        <Space size="middle">
          <span
            onClick={() => viewAppointmentDetails(record.id)}
            className="edit-color icon-button"
          >
            {' '}
            <i className="fa fa-eye"></i>{' '}
          </span>
          <span
            className="edit-color icon-button"
            onClick={() => store.dispatch({ type: 'OPEN_EDIT_APPOINTMENT_MODAL' })}
          >
            {' '}
            <i className="fa fa-edit"></i>{' '}
          </span>
          <Popconfirm
            title="Are you sure？"
            onConfirm={() => props.deleteAppointment(record.id)}
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

  return (
    <div className="table-content">
      <div className="headerButton">
        <Space direction="horizontal">
          <Button
            className="view-button"
            onClick={getToday}
            style={currentButton === 1 ? { backgroundColor: 'black' } : {}}
            type="primary"
          >
            {' '}
            today
          </Button>
          <Button
            className="edit-button"
            onClick={getUpComing}
            style={currentButton === 2 ? { backgroundColor: 'black' } : {}}
            type="primary"
          >
            {' '}
            upcoming
          </Button>
        </Space>
      </div>
      <Table columns={columns} dataSource={props.payload} scroll={{}} />
      <Modal
        visible={props.modal2}
        footer={false}
        onCancel={() => store.dispatch({ type: 'CLOSE_VIEW_APPOINTMENT_MODAL' })}
      >
        <AppointmentView {...props} />
      </Modal>
      <Modal
        visible={props.modal1}
        footer={false}
        onCancel={() => store.dispatch({ type: 'CLOSE_EDIT_APPOINTMENT_MODAL' })}
      >
        <AppointmentEdit {...props} />
      </Modal>
    </div>
  );
};

const mapStoreToProps = ({ Dashboard , Appointment , Branch }) => {
  return {
    payload: Dashboard.payload,
    modal: Dashboard.modal,

    Appointment: Appointment.payload,
    error: Appointment.error,
    message: Appointment.message,
    modal: Appointment.modal,
    modal1: Appointment.modal1,
    modal2: Appointment.modal2,
    changed: Appointment.changed,
    branch: Branch.payload,
    view: Appointment.view,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAppointmentHome: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_APPOINTMENT_HOME', param })),

    viewAppointment: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'VIEW_APPOINTMENT', id })),

    editStatusAppointment: (id, param) =>
    dispatch(actionCreator({ method: 'PUT', action_type: 'STATUS_CHANGE_APPOINTMENT', id, param })),

    deleteAppointment: id =>
    dispatch(actionCreator({ method: 'DELETE', action_type: 'DELETE_APPOINTMENT', id })),
});

export default connect(mapStoreToProps, mapDispatchToProps)(PatientAppointment);




