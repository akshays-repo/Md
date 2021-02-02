import React, { useState, useEffect } from 'react';
import { Table, Modal, Tag, Space, Input, Button, Radio, Select, Form } from 'antd';
import AddAppointmentTime from './addAppointmentTime';
import { store } from '../../../reducers/configureStore';
import ProviderCreationForm from './providerCreationForm';
import { connect } from 'react-redux';
import { getFormDataA } from '_utils';
import { valuesIn } from 'lodash';

const ProviderTable = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [selectedItems, setSelectedItem] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState('');

  useEffect(() => {
    setAppointmentTypes(store.getState().AppointmentType.payload);
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
    let currentValue = []
    record.provider_and_types.map((type) => currentValue.push(type.appointment_type.id))
    let DeletedArray =  currentValue.filter(e => !values.includes(e));
    let intValues = {
      userTypeId: 4,
      id: record.id,
      fullName: record.fullName,
      status: record.status,
      branchId: record.branchId,
      provider_typeId: record.provider_typeId,
    };
    console.log("ISARRAY",Array.isArray(intValues.appointment_type))
    try {
      let sentinData = getFormDataA({...intValues})
      values.map((va,i)=>sentinData.append('appointment_type[]',va))
    await props.editProvider(record.id,sentinData);
    } catch (err) {
      console.log('edit error', err);
    }
  };

const handleStatus = async ( record , values) =>{
  let intValues = {
    appointment_type: record.appointment_type,
    userTypeId: 4,
    id: record.id,
    fullName: record.fullName,
    status: values,
    branchId: record.branchId,
    provider_typeId: record.provider_typeId,
  };

  try {
    await props.editProvider(record.id, getFormDataA({ ...intValues }));
  } catch (err) {
    console.log('error', err);
  }
}

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text, record) => (
        <span>
          {text}
          <br />
          <span style={{ color: 'ButtonShadow' }}>{record.provider_type.name}</span>
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
          <button onClick={() => showModal(record.id, record)} className="edit-button">
            Edit
          </button>
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
               mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select the type"
              defaultValue={record?.provider_and_types?.map((type) => type.appointment_type?.name !== null ? type.appointment_type?.name : null)}
              onChange={(e) => handleApptChange(record, e)}
              style={{width:"200px"}}
            >
            {appointmentTypes.map((type) =>(
              <Select.Option key={type.id}>{type.name}</Select.Option>
            ))}
            </Select>
          </Space>
        );
      },
    },
    {
      title: 'Status',
      key: 'status',
      render: (text, record) => 
      <Space size="middle">
      <Select 
       defaultValue={record.status}
       onChange={(record,e) => handleStatus(e, record)}>
      <Select.Option value="active">Active</Select.Option>
      <Select.Option value="hold">Hold</Select.Option>
    </Select>

      </Space>,
    },
    {
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <button className="edit-button" onClick={() => handleEditModal(record.id, record)}>
            {' '}
            Edit{' '}
          </button>
          <button className="delete-button"> Delete</button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={props.provider.users} />
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
