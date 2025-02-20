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
import AppointmentEdit from '../Appointments/appointmentEdit';


const { Option } = Select;
//THIS IS ANT DESIGN TABLE : PLEASE REFER THIS IF YOU STUCKED : https://ant.design/components/table/
const PatientAppointment = props => {
  const [currentButton, setCurrentButton] = useState(1);
  const [dashboardStateChanged , setDashboardStateChanged] = useState(false)
  
  const handleChangePaymentStatus = async (id, payment_status) => {
    await props.editStatusAppointment(id, { payment_status });
    setDashboardStateChanged(true)
  };

  const handleChangeStatus = async (id, status) => {
    await props.editStatusAppointment(id, { status });
    setDashboardStateChanged(true)
  };

  useEffect(() => {
    if(currentButton === 1){
    props.fetchAppointmentHome({ fromDate: moment().format('L'), toDate: moment().add(1,'days').format('L')})
    setCurrentButton(1)
    }else{
    props.fetchAppointmentHome({  fromDate: moment().format('L') })
    setCurrentButton(2)
    }
  }, [dashboardStateChanged]);


  const getUpComing = () =>{
    setCurrentButton(2)
    props.fetchAppointmentHome({  fromDate: moment().format('L') })
  }
  const getToday =() =>{
    setCurrentButton(1)
    props.fetchAppointmentHome({ fromDate: moment().format('L'), toDate: moment().add(1,'days').format('L')})
  }


  const viewAppointmentDetails = async id => {
    await props.viewAppointment(id);
    store.dispatch({ type: 'OPEN_VIEW_APPOINTMENT_MODAL' });
  };

  const editAppointment = async id => {
    await props.viewAppointment(id);
    store.dispatch({ type: 'OPEN_EDIT_APPOINTMENT_MODAL' });
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
    },
    {
      title: 'Payment Status',
      dataIndex: '',
      key: '',
      render: record => (
        <div>
          <Select
              value={record.payment_status}
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
              value={record.status}
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
           onClick={() =>editAppointment(record.id) }
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
            className="inactive-button  button-square"
            onClick={getToday}
            style={currentButton === 1 ? { backgroundColor: '#42a5f6' } : {}}
            type="primary"
          >
            {' '}
            Today
          </Button>
          <Button
            className="inactive-button   button-square"
            onClick={getUpComing}
            style={currentButton === 2 ? { backgroundColor: '#42a5f6' } : {}}
            type="primary"
          >
            {' '}
            Upcoming
          </Button>
        </Space>
      </div>
      <Table columns={columns} dataSource={props.payload}  scroll={{  x: 240 }}/>
      <Modal
        visible={props.modal2}
        footer={false}
        onCancel={() => store.dispatch({ type: 'CLOSE_VIEW_APPOINTMENT_MODAL' })}
        destroyOnClose
      >
        <AppointmentView {...props} />
      </Modal>
      <Modal
        visible={props.modal1}
        footer={false}
        onCancel={() => store.dispatch({ type: 'CLOSE_EDIT_APPOINTMENT_MODAL' })}
        destroyOnClose

      >
        <AppointmentEdit editAppointment={editAppointment}  {...props} />
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

    editAppointment: (id, values ,contentType) =>
    dispatch(actionCreator({ method: 'PUT', action_type: 'EDIT_APPOINTMENT', id, values ,contentType })),
  
});

export default connect(mapStoreToProps, mapDispatchToProps)(PatientAppointment);




