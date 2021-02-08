import React, { useEffect ,useState} from 'react';
import { Space, Card, Row, Col ,Table, Tag, } from 'antd';
import Dashboard_Content from '..';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';
import moment from 'moment'
const columns = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (text, record) => (
        <span>{record.firstName} {record.lastName}</span>         ),
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
    title: 'Appointment Start',
    dataIndex: 'appointment_start',
    key: 'appointment_start',
    render:(record) =>(
      <span> {moment(record.appointment_start).format('MMM DD h:mm A')} </span> 
    )
    
    
  },
  {
    title: 'Payment Status',
    dataIndex: 'payment_status',
    key: 'payment_status',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '',
    dataIndex: 'status',
    key: 'status',
    render:(record) =>(
      <Space size="middle">
      <span className="edit-color icon-button">
        {' '}
        <i className="fa fa-eye"></i>{' '}
      </span>
      <span className="edit-color icon-button">
        {' '}
        <i className="fa fa-edit"></i>{' '}
      </span>
      <span className="delete-color"> <i className="fa fa-trash"></i></span>
    </Space>
    
    )
    
  },

];

const Dashboard_Appointments = (props) => {
  const Appointments = () => {

    const [AppointmentList , setAppointmentList] = useState(store.getState().Appointment.payload)
    useEffect(() =>{
    props.fetchAppointment() 
    },[])

    useEffect(() =>{
      setAppointmentList(props.Appointment)
      })

    return (
      <div className="appointment-section">
      <Table dataSource={AppointmentList} columns={columns}  />
      </div>
    );
  };
  return <Dashboard_Content content={Appointments()} />;
};


const mapStoreToProps = ({ Appointment }) => {
  console.log('Store', Appointment);
  return {
    Appointment: Appointment.payload,
    error: Appointment.error,
    message: Appointment.message,
    modal: Appointment.modal,
    modal1: Appointment.modal1,
    changed: Appointment.changed,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchAppointment: () =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_APPOINTMENT' })),
  addAppointment: values =>
    dispatch(actionCreator({ method: 'POST', action_type: 'CREATE_BRANCH', values })),
  editAppointment: (id, values) =>
    dispatch(actionCreator({ method: 'PUT', action_type: 'EDIT_BRANCH', id, values })),
  deleteAppointment: id =>
    dispatch(actionCreator({ method: 'DELETE', action_type: 'DELETE_BRANCH', id })),
  filterAppointment: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FILTER_BRANCH',
        param,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard_Appointments);
