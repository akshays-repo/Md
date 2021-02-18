import React, { useEffect, useState } from 'react';
import { Space, Select, Row, Col, Table, Tag, DatePicker, Input, Modal, Popconfirm , } from 'antd';
import Dashboard_Content from '..';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';
import moment from 'moment';
import AppointmentView from './appointmentView';
import AppointmentEdit from './appointmentEdit';

const { Option } = Select;

const Dashboard_Appointments = props => {
  const Appointments = () => {
    const [searchKey, setSearchKey] = useState('');
    const [toData, setToDate] = useState('');
    const [fromData, setFromDate] = useState('');
    const [viewId, setViewId] = useState([]);
    const [branchId, setBranchId] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
      props.fetchAppointment();
    }, [props.changed]);

    useEffect(() => {
      props.fetchBranch({ hospitalId: localStorage.getItem('hospital_id'), page: 1, limit: 50 });
    }, []);

    const handleChangeSearch = e => {
      e.preventDefault();
      setSearchKey(e.target.value);
    };

    const handleSearchSubmission = e => {
      e.preventDefault();
      let parms = {};
      if (searchKey) parms.search = searchKey;
      if (branchId) parms.search = searchKey;
      if (paymentStatus) parms.payment_status = paymentStatus;
      if (status) parms.status = status;
      if (fromData) parms.fromDate = fromData;
      if (toData) parms.toDate = toData;
      props.filterAppointment(parms);
    };

    const clearFilter = () => {
      setBranchId(null);
      setSearchKey(null);
      setToDate('');
      setFromDate('');
      setPaymentStatus(null);
      setStatus(null);
      props.fetchAppointment();
    };

    const viewAppointmentDetails = async id => {
      await props.viewAppointment(id);
      setViewId(id);
      store.dispatch({ type: 'OPEN_VIEW_APPOINTMENT_MODAL' });
    };

    const handleChangePaymentStatus = async (id, payment_status) => {
      props.editStatusAppointment(id, { payment_status });
    };

    const handleChangeStatus = async (id, status) => {
      props.editStatusAppointment(id, { status });
    };

    const handleAppointmentEdit = async (id) =>{
      await props.viewAppointment(id);
      setViewId(id);
      store.dispatch({ type: 'OPEN_EDIT_APPOINTMENT_MODAL' });
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
              onClick={() => handleAppointmentEdit(record.id)}
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
      <div className="appointment-section">
        <div className="search">
          <Space direction="vertical">
            <Input
              value={searchKey}
              type="text"
              placeholder=" Name Email or Phone"
              onChange={handleChangeSearch}
            />

            <DatePicker
              placeholder="From Date"
              onChange={e => setFromDate(moment(e).format('YYYY-MM-DD'))}
              value={fromData !== "" ? moment(fromData) : ""}
            />
            <DatePicker
              placeholder="To Date"
              onChange={e => setToDate(moment(e).format('YYYY-MM-DD'))}
              value={toData !== "" ? moment(toData) : ""}
            />

            <Select
              value={paymentStatus}
              placeholder="Payment"
              onChange={e => setPaymentStatus(e)}
              style={{ width: 120 }}
            >
              <Option value="pending">Pending</Option>
              <Option value="failed">Failed</Option>
              <Option value="paid">Paid</Option>
              <Option value="requested">Requested</Option>
              <Option value="manually_paid">Manually Paid</Option>
            </Select>

            <Select
              value={branchId}
              onChange={e => setBranchId(e)}
              placeholder="Branch"
              style={{ width: 120 }}
            >
              {props.branch?.map(branch => (
                <Option key={branch.id} value={branch.id}>
                  {branch.fullName}
                </Option>
              ))}
            </Select>

            <Select
              value={status}
              placeholder="status"
              onChange={e => setStatus(e)}
              style={{ width: 120 }}
            >
              <Option value="pending">Pending</Option>
              <Option value="confirmed">Confirmed</Option>
              <Option value="cancelled">Cancelled</Option>
              <Option value="completed">Completed</Option>
            </Select>
            <button className="view-button button-square" onClick={handleSearchSubmission}>
              Filter
            </button>
            <button className="edit-button button-square" onClick={clearFilter}>
              clear
            </button>
          </Space>
        </div>
        <Table     scroll={{  x: 240 }}
 dataSource={props.Appointment} columns={columns} />
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
        <AppointmentView {...props} />
      </Modal>
      <Modal
        visible={props.modal1}
        footer={false}
        onCancel={() => store.dispatch({ type: 'CLOSE_EDIT_APPOINTMENT_MODAL' })}
      >
        <AppointmentEdit {...props} />
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
    view: Appointment.view,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchBranch: param =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_BRANCH', param })),

  fetchAppointment: () =>
    dispatch(actionCreator({ method: 'GET', action_type: 'FETCH_APPOINTMENT' })),
  addAppointment: values =>
    dispatch(actionCreator({ method: 'POST', action_type: 'CREATE_BRANCH', values })),
  editAppointment: (id, values ,contentType) =>
    dispatch(actionCreator({ method: 'PUT', action_type: 'EDIT_APPOINTMENT', id, values ,contentType })),
  editStatusAppointment: (id, param ) =>
    dispatch(actionCreator({ method: 'PUT', action_type: 'STATUS_CHANGE_APPOINTMENT', id, param })),
  deleteAppointment: id =>
    dispatch(actionCreator({ method: 'DELETE', action_type: 'DELETE_APPOINTMENT', id })),

  viewAppointment: id =>
    dispatch(actionCreator({ method: 'GET', action_type: 'VIEW_APPOINTMENT', id })),

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
