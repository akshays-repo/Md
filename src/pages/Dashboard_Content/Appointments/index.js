import React, { useEffect, useState } from 'react';
import { Space, Select, Row, Col, Table, Tag, DatePicker, Input, Modal } from 'antd';
import Dashboard_Content from '..';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';
import moment from 'moment';
import AppointmentView from './appointmentView';
const { Option } = Select;

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
    render: record => <span> {moment(record.appointment_start).format('MMM DD h:mm A')} </span>,
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
    render: record => (
      <Space size="middle">
        <span
          onClick={() => store.dispatch({ type: 'OPEN_VIEW_APPOINTMENT_MODAL' })}
          className="edit-color icon-button"
        >
          {' '}
          <i className="fa fa-eye"></i>{' '}
        </span>
        <span className="edit-color icon-button">
          {' '}
          <i className="fa fa-edit"></i>{' '}
        </span>
        <span className="delete-color">
          {' '}
          <i className="fa fa-trash"></i>
        </span>
      </Space>
    ),
  },
];

const Dashboard_Appointments = props => {
  const Appointments = () => {
    const [AppointmentList, setAppointmentList] = useState(store.getState().Appointment.payload);
    const [searchKey, setSearchKey] = useState('');
    const [toData, setToDate] = useState(moment().format('YYYY-MM-DD'));
    const [fromData, setFromDate] = useState('1900/02/05');
    const [branchList, setBranchList] = useState([]);
    const [branchId, setBranchId] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
      props.fetchAppointment();
    }, []);

    useEffect(() => {
      setAppointmentList(props.Appointment);
      props.fetchBranch({ hospitalId: localStorage.getItem('hospital_id'), page: 1, limit: 50 });
      console.log('Babsass', props.branch);
    }, []);

    const handleChangeSearch = e => {
      e.preventDefault();
      setSearchKey(e.target.value);
    };

    const handleSearchSubmission = e => {
      e.preventDefault();
      let parms = {
        fromDate: fromData,
        toDate: toData,
      };
      if (searchKey) parms.search = searchKey;
      if (branchId) parms.search = searchKey;
      if (paymentStatus) parms.status = paymentStatus;
      if (status) parms.payment_status = status;
      props.filterAppointment(parms);
    };

    const clearFilter = e => {
      setAppointmentList('');
      setBranchId('');
      setSearchKey('');
      props.fetchAppointment();
    };

    return (
      <div className="appointment-section">
        <div style={{ marginBottom: '10px' }} className="search">
          <Space direction="horizontal">
            <Input type="text" placeholder=" Name Email or Phone" onChange={handleChangeSearch} />

            <DatePicker
              placeholder="From Date"
              onChange={e => setFromDate(moment(e).format('YYYY-MM-DD'))}
            />
            <DatePicker
              placeholder="To Date"
              onChange={e => setToDate(moment(e).format('YYYY-MM-DD'))}
            />

            <Select
              placeholder="Payment"
              onChange={e => setPaymentStatus(e)}
              style={{ width: 120 }}
            >
              <Option value="pending">Pending</Option>
              <Option value="confirmed">Confirmed</Option>
              <Option value="cancelled">Cancelled</Option>
              <Option value="completed">Completed</Option>
            </Select>

            <Select onChange={e => setBranchId(e)} placeholder="Branch" style={{ width: 120 }}>
              {props.branch?.map(branch => (
                <Option value={branch.id}>{branch.fullName}</Option>
              ))}
            </Select>

            <Select placeholder="status" onChange={e => setStatus(e)} style={{ width: 120 }}>
              <Option value="hold">Hold</Option>
              <Option value="active">Active</Option>
            </Select>
            <button className="view-button button-square" onClick={handleSearchSubmission}>
              Filter
            </button>
            <button className="view-button button-square" onClick={clearFilter}>
              clear
            </button>
          </Space>
        </div>
        <Table dataSource={props.Appointment} columns={columns} />
      </div>
    );
  };
  return (
    <div>
      <Modal
       
        visible={props.modal2}
        footer={false}
        onCancel={() => store.dispatch({ type: 'CLOSE_VIEW_APPOINTMENT_MODAL' })}
      >
        <AppointmentView />
      </Modal>
      <Dashboard_Content content={Appointments()} />;
    </div>
  );
};

const mapStoreToProps = ({ Appointment, Branch }) => {
  console.log('Store', Appointment);
  return {
    Appointment: Appointment.payload,
    error: Appointment.error,
    message: Appointment.message,
    modal: Appointment.modal,
    modal1: Appointment.modal1,
    modal2: Appointment.modal2,
    changed: Appointment.changed,
    branch: Branch.payload,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchBranch: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_BRANCH', param })),
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
        action_type: 'FILTER_APPOINTMENT',
        param,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard_Appointments);
