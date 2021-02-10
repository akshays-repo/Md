import React, { useState, useEffect } from 'react';
import { Table, Modal, Tag, Space, Input, Button, Radio, Select, Form } from 'antd';
import AddAppointmentTime from './addAppointmentTime';
import { store } from '../../../reducers/configureStore';
import ProviderCreationForm from './providerCreationForm';
import { connect } from 'react-redux';
import MultiSelect from 'react-multi-select-component';
import { getFormDataA, getFormData } from '_utils';
import { map } from 'lodash';
const { Option } = Select;
const ProviderTable = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState('');

  const [branchList, setBranchList] = useState([]);
  const [branchId, setBranchId] = useState('');
  const [providerTypeId, setProviderTypeId] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [appointmentTypeId, setAppointmentTypeId] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    setAppointmentTypes(props.appointment_type);
    //setBranchList(store.getState().Branch.payload);
  });

  const showModal = (id, data) => {
    setEditId(id);
    setEditData(data);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    store.dispatch({ type: 'CLOSE_PROVIDER_EDIT_MODAL' });
    setIsModalVisible(false);
  };

  const handleEditModal = (id, data) => {
    setEditData(data);
    setEditId(id);
    store.dispatch({ type: 'OPEN_PROVIDER_EDIT_MODAL' });
  };

  const handleApptChange = async (record, values) => {
    // this will perform delete
    let currentValue = [];
    record.provider_and_types.map(type => currentValue.push(type.appointment_type?.id));
    let intersection = currentValue.filter(x => values.includes(x));
    let DeletedArray = [];
    DeletedArray = currentValue
      .filter(x => !intersection.includes(x))
      .concat(intersection.filter(x => !currentValue.includes(x)));

    let intValues = {
      userTypeId: 4,
      id: record.id,
      fullName: record.fullName,
      status: record.status,
      branchId: 1,
      provider_typeId: record.provider_typeId,
    };

    let sentinData = getFormData({ ...intValues });
    values.map((va, i) => sentinData.append('appointment_type[]', va));
    DeletedArray.map((va, i) => sentinData.append('deleted_type[]', va));
    await props.editProvider(record.id, sentinData);
  };

  const handleStatus = async (record, status) => {
    try {
      await props.editProviderStatus(record.id, { status });
    } catch (err) {
      console.log('error', err);
    }
  };

  const handleDelete = async id => {
    await props.deleteProvider(id);
  };

  const handleChangeSearch = e => {
    e.preventDefault();
    setSearchKey(e.target.value);
  };
  const handleSearchSubmission = e => {
    e.preventDefault();
    let parms = {};
    if (searchKey) parms.search = searchKey;
    if (branchId) parms.branchId = branchId;
    if (providerTypeId) parms.provider_typeId = providerTypeId;
    if (appointmentTypeId) parms.type_id = appointmentTypeId;
    if (status) parms.status = status;

    props.filterProvider(parms);
  };
  const clearFilter = e => {
    e.preventDefault();
    setBranchId('as');
    setAppointmentTypeId('');
    setSearchKey('');
    setStatus('');
    props.fetchProvider();
  };

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text, record) => (
        <span>
          {text}
          <br />
          <span style={{ color: 'ButtonShadow' }}>{record.provider_type?.name}</span>
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Work Hour',
      dataIndex: 'workhour',
      key: 'workhour',
      render: (text, record) => (
        <Space size="middle">
          <span onClick={() => showModal(record.id, record)} className="icon-button edit-color">
            <i class="fa fa-edit"></i>
          </span>
        </Space>
      ),
    },
    {
      title: 'Appt Type',
      dataIndex: 'appt',
      key: 'appt',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Select
              className="appt-type-select"
              mode="multiple"
              style={{ width: '150px', maxHeight: '150px' }}
              placeholder="Select the type"
              key={record?.provider_and_types?.map(type =>
                type.appointment_type === null ? null : type.appointment_type.id,
              )}
              defaultValue={record?.provider_and_types?.map(type => type.appointment_type?.id)}
              onChange={e => handleApptChange(record, e)}
            >
              {appointmentTypes.map(type => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Space>
        );
      },
    },

    {
      title: 'Status',
      key: 'status',
      render: (text, record) => (
        <Space size="middle">
          <Select
            style={record.status === 'active' ? { color: 'green' } : { color: 'red' }}
            defaultValue={record.status}
            onChange={e => handleStatus(record, e)}
          >
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="hold">Hold</Select.Option>
          </Select>
        </Space>
      ),
    },
    {
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <span
            className="edit-color icon-button"
            onClick={() => handleEditModal(record.id, record)}
          >
            {' '}
            <i className="fa fa-edit"></i>{' '}
          </span>
          <span className="delete-color" onClick={() => handleDelete(record.id)}>
            {' '}
            <i className="fa fa-trash"></i>
          </span>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '10px' }} className="search">
        <Space direction="horizontal">
          <Input
            type="text"
            value={searchKey}
            placeholder=" Name Email or Phone"
            onChange={handleChangeSearch}
          />

          <Select
            placeholder="Appointment Type"
            onChange={e => setAppointmentTypeId(e)}
            style={{ width: 150 }}
          >
            {props.appointment_type?.map(type => (
              <Option value={type.id}>{type.name}</Option>
            ))}
          </Select>

          <Select
            defaultValue={branchId}
            onChange={e => setBranchId(e)}
            placeholder="Branch"
            style={{ width: 120 }}
          >
            {branchList?.map(branch => (
              <Option value={branch.id}>{branch.fullName}</Option>
            ))}
          </Select>

          <Select
            placeholder="provider type"
            onChange={e => setProviderTypeId(e)}
            style={{ width: 150 }}
          >
            {props.ProviderTypePayload?.map(type => (
              <Option value={type.id}>{type.name}</Option>
            ))}
          </Select>

          <Select onChange={e => setStatus(e)} placeholder="status" style={{ width: 120 }}>
            <Option value="active">ACTIVE</Option>
            <Option value="hold">HOLD</Option>
          </Select>

          <button className="view-button button-square" onClick={handleSearchSubmission}>
            Filter
          </button>
          <button className="view-button button-square" onClick={clearFilter}>
            clear
          </button>
        </Space>
      </div>

      <Table columns={columns} dataSource={props.provider} />
      <Modal
        footer={false}
        width={800}
        title={`Add time for ${editData.fullName}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AddAppointmentTime id={editId} {...props} />
      </Modal>
      <Modal
        footer={false}
        width={800}
        title=""
        visible={props.modal1}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ProviderCreationForm id={editId} values={editData} {...props} />
      </Modal>
    </div>
  );
};

const mapStoreToProps = ({ AppointmentType }) => {
  return {
    appointment_type: AppointmentType.payload,
    modal: AppointmentType.modal,
    changed: AppointmentType.changed,
  };
};
export default connect(mapStoreToProps)(ProviderTable);
