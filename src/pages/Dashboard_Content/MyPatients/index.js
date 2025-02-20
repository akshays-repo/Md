import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Space, Popconfirm, Select, Tag, DatePicker, Input } from 'antd';
import Dashboard_Content from '..';
import PatientCreationForm from './patientCreationForm';
import { Modal } from 'antd';
import { store } from '../../../reducers/configureStore';
import { actionCreator } from '../../../reducers/actionCreator';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';

const { Option } = Select;

const Dashboard_MyPatients = props => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState('');
  const [mobileFilter, setMobileFilter] = useState(false);

  const openEditModal = (id, data) => {
    setEditId(id);
    setEditData({ ...data, dob: data.dob.split('T')[0] });
    store.dispatch({ type: 'OPEN_PATIENT_MODAL' });
  };

  const showModal = () => {
    setEditId(null);
    setEditData(null);
    store.dispatch({ type: 'OPEN_PATIENT_MODAL' });
  };

  const handleCancel = () => {
    // setIsModalVisible(false);
    setEditId(null);
    setEditData(null);
    store.dispatch({ type: 'CLOSE_PATIENT_MODAL' });
  };

  useEffect(() => {
    props.fetchPatient({ page: 1, limit: 10000 });
  }, [props.changed, props.deleted]);

  const handleStatus = (id, status) => {
    props.editStatusPatient(id, { status });
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: record => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Lastname',
      key: 'lastName',
      dataIndex: 'lastName',
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
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // },

    {
      title: 'Status',
      dataIndex: '',
      key: '',
      render: (text, record) => (
        <Space size="middle">
          <Select
            className="holdActive"
            style={record.status === 'active' ? { color: 'green' } : { color: 'red' }}
            value={record.status}
            onChange={e => handleStatus(record.id, e)}
          >
            <Select.Option style={{ color: 'green' }} value="active">
              Active
            </Select.Option>
            <Select.Option style={{ color: 'red' }} value="hold">
              Hold
            </Select.Option>
          </Select>
        </Space>
      ),
    },
    {
      title: '',
      key: 'action',
      render: record => (
        <Space size="middle">
          <span className="edit-color icon-button" onClick={() => openEditModal(record.id, record)}>
            <i className="fa fa-edit"></i>
          </span>
          <Popconfirm
            title="Are you sure？"
            onConfirm={() => props.deletePatient(record.id)}
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

  const MyPatients = () => {
    const [status, setStatus] = useState(null);
    const [search, setSearch] = useState(null);

    const handleChangeSearch = e => {
      e.preventDefault();
      setSearch(e.target.value);
    };

    const handleSearchSubmission = e => {
      e.preventDefault();
      let parms = {};
      if (search) parms.search = search;
      if (status) parms.status = status;
      props.filterPatient(parms);
      setMobileFilter(false);
    };

    const clearFilter = e => {
      e.preventDefault();
      setStatus(null);
      setSearch(null);
      props.fetchPatient();
      setMobileFilter(false);
    };
    const filterSection = () => {
      return (
        <div className="patientButtonform">
          <form className="search-area">
            <div style={{ marginBottom: '10px' }} className="search">
              <Space direction="horizontal">
                <Input
                  type="text"
                  placeholder=" Name Email or Phone"
                  onChange={handleChangeSearch}
                  value={search}
                  style={{ width: '100%' }}
                />
                <Select
                  className="holdActive"
                  placeholder="status"
                  value={status}
                  onChange={e => setStatus(e)}
                  style={{ width: '100%' }}
                >
                  <Option value="">All</Option>
                  <Option value="hold">Hold</Option>
                  <Option value="active">Active</Option>
                </Select>
                <div className="mbl-button">
                <button className="view-button mr3 button-square" onClick={handleSearchSubmission}>
                  Filter
                </button>
                <button className="edit-button button-square" onClick={clearFilter}>
                  clear
                </button>
                </div>
              </Space>
            </div>
          </form>
        </div>
      );
    };

    return (
      <div className="mypatient">
        <div className="pageTitle">
          <h4>MY PATIENTS</h4>
        </div>
        <div className="search">
          {isMobile ? (
            <button className="view-button button-square" onClick={() => setMobileFilter(true)}>
              <i class="fas fa-filter" />
              Filter
            </button>
          ) : (
            filterSection()
          )}
          <Button className="view-button button-square" type="primary" onClick={showModal}>
            Create a New Patient
          </Button>
          <Modal
            title={editId ? 'Edit Patient Details' : 'Add Patient Details'}
            visible={props.modal}
            onCancel={handleCancel}
            width={600}
            footer={null}
          >
            {editId ? (
              <PatientCreationForm id={editId} values={editData} {...props}></PatientCreationForm>
            ) : (
              <PatientCreationForm {...props} />
            )}
          </Modal>
        </div>
        <div className="patient_name"></div>
        <Table scroll={{ x: 240 }} columns={columns} dataSource={props.patient} />,
        <Modal visible={mobileFilter} footer={false} onCancel={() => setMobileFilter(false)}>
          {filterSection()}
        </Modal>
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
    changed: Patient.changed,
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
        method: 'PUT',
        action_type: 'EDIT_PATIENT',
        id,
        values,
      }),
    ),

  editStatusPatient: (id, param) =>
    dispatch(
      actionCreator({
        method: 'PUT',
        action_type: 'EDIT_PATIENT_STATUS',
        id,
        param,
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
