import React, { useState, useEffect } from 'react';
import { Table, Modal, Tag, Space, Input, Button, Radio, Select, Form } from 'antd';
import AddAppointmentTime from './addAppointmentTime';
import { store } from '../../../reducers/configureStore';
import ProviderCreationForm from './providerCreationForm';
import { connect } from 'react-redux';
import MultiSelect from "react-multi-select-component";
import { getFormDataA, getFormData } from '_utils';
import { map } from 'lodash';

const ProviderTable = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [selectedItems, setSelectedItem] = useState([]);
  const [providers, setProviders] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState('');

  useEffect(() => {
    setAppointmentTypes(props.appointment_type);
  });
  const getProvider = () => {
    console.log('props000', props.provider);
    let newData = [];
    props.provider.map(data => newData.push(data.provider));
    return newData;
  };
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

    console.log("sjdhasjhdjkash", values);
    // this will perform delete
    let currentValue = [];
    record.provider_and_types.map(type => currentValue.push(type.appointment_type?.id));
    let intersection = currentValue.filter(x => values.includes(x));
    let DeletedArray = []
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
    console.log('rorororror', record);
    try {
      await props.editProviderStatus(record.id, { status });
    } catch (err) {
      console.log('error', err);
    }
  };

  const handleDelete = async id => {
    console.log('deleter', props);
    await props.deleteProvider(id);
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
              style={{ width: '150px',maxHeight:"150px" }}
              placeholder="Select the type"
              key={record?.provider_and_types?.map(type =>
                type.appointment_type === null ? null :type.appointment_type.id ,
              )}
              defaultValue={record?.provider_and_types?.map(type => type.appointment_type?.id
              )}

              onChange={e => handleApptChange(record, e)}
            >
              {appointmentTypes.map(type => (
                <Select.Option key={type.id} value={type.id}>{type.name}</Select.Option>
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
