import React, { useState , useEffect} from 'react';
import { Table, Modal, Tag, Space, Input, Button, Radio, Select, Form } from 'antd';
import AddAppointmentTime from './addAppointmentTime';
import { store } from '../../../reducers/configureStore';
import ProviderCreationForm from './providerCreationForm';
import { connect } from 'react-redux';
import { getFormDataA } from '_utils';


const ProviderTable = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, seteditModalVisible] = useState(false);
  const [appointmentTypes , setAppointmentTypes] = useState([])

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState('');

  useEffect(() =>{
    setAppointmentTypes(store.getState().AppointmentType.payload)
    console.log("ssssssssss",appointmentTypes)
  }, )


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    store.dispatch({ type: 'CLOSE_PROVIDER_CREATE_MODAL' })
    seteditModalVisible(false)
    setIsModalVisible(false)
  };
  
  const handleEditModal = (id , data) =>{
    setEditData(data);
    setEditId(id)
    store.dispatch({ type: 'OPEN_PROVIDER_CREATE_MODAL' })
    seteditModalVisible(true)

  }

  const handleApptChange = async values => {
    let intValues = {
      appointment_type:values
    }
    console.log("intValuesz",intValues)
    try {
      await props.editProvider(getFormDataA({ ...intValues }));
    } catch (err) {
      console.log("edit error",err);
    }
  };

  useEffect(() => {
    console.log('poooops', props)
  })

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text, record) => <span>{text}<br/> 
      <span style={{color:"ButtonShadow"}}>{record.provider_type.name}</span>  
      </span>,
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
          <button onClick={showModal} className="edit-button">Edit</button>
        </Space>
      ),
    },
    {
      title: 'Appt Type',
      dataIndex: 'appt',
      key: 'appt',
      render: (text, record) => (
        <Space size="middle">
          <Form>
            <Form.Item label="">
                <Select className="selectBox" onChange={handleApptChange}  mode="multiple">
                {appointmentTypes.map((type) =>{return(
                  <Select.Option value={type.id}>{type.name}</Select.Option>
                )
                })}
                </Select>
            </Form.Item>
          </Form>
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (text, record) => <Space size="middle">{record.status}</Space>,
    },
    {
      key: 'action',
      render: (text, record) => <Space size="middle"> 
      <button  className="edit-button" onClick={() =>handleEditModal(record.id , record) }> Edit </button> 
      <button className="delete-button"> Delete</button>
      </Space>,
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
      <Modal footer={false} width={800}  title="" 
      visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <AddAppointmentTime  {...props}/>
      </Modal>
      <Modal footer={false} width={800}  title="" 
      visible={props.modal} onOk={handleOk} onCancel={handleCancel}>
        <ProviderCreationForm id={editId} values={editData}  {...props}/>
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

