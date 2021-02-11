import React, { useEffect, useState } from 'react';
import {
  Space,
  Button,
  Select,
  Table,
  Popconfirm,
} from 'antd';
import Dashboard_Content from '..';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';
import moment from 'moment';

const { Option } = Select;
//THIS IS ANT DESIGN TABLE : PLEASE REFER THIS IF YOU STUCKED : https://ant.design/components/table/
const PatientAppointment = props => {
  const [currentButton, setCurrentButton] = useState(1);
  const handleChangePaymentStatus = () => {};
  const viewAppointmentDetails = () => {};
  const handleChangeStatus = () => {};

  useEffect(() => {
    props.fetchAppointmentHome({  toDate: moment().format('L') });
  }, []);


  const getUpComing = () =>{
    setCurrentButton(2)
    props.fetchAppointmentHome({  toDate: moment().format('L') })
  }
  const getToday =() =>{
    setCurrentButton(1)
    props.fetchAppointmentHome({ fromDate: moment().format('L'), toDate: moment().format('L')})
  }


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
      title: 'Appointment Start',
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
          >
            <Option value="pending">Pending</Option>
            <Option value="failed">Failed</Option>
            <Option value="paid">Paid</Option>
            <Option value="requested">Requested</Option>
            <Option value="manually_paid">Manually Paid</Option>
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
            onChange={e => handleChangeStatus(record.id, e)}
          >
            <Option value="pending">Pending</Option>
            <Option value="confirmed">Confirmed</Option>
            <Option value="cancelled">Cancelled</Option>
            <Option value="completed">Completed</Option>
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
    </div>
  );
};

const mapStoreToProps = ({ Dashboard }) => {
  return {
    payload: Dashboard.payload,
    modal: Dashboard.modal,
    changed: Dashboard.changed,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAppointmentHome: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_APPOINTMENT_HOME', param })),
});

export default connect(mapStoreToProps, mapDispatchToProps)(PatientAppointment);
