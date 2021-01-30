import React, { useState , useEffect} from 'react';
import { Table, Modal, Tag, Space, Input, Button, Radio, Select, Form } from 'antd';
import AddAppointmentTime from './addAppointmentTime';
import { store } from '../../../reducers/configureStore';
import ProviderCreationForm from './providerCreationForm';
import { set } from 'store';


const ProviderTable = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, seteditModalVisible] = useState(false);
  

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState('');

  useEffect(() =>{
    console.log("store.dispatch",props);
  }, [])


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    store.dispatch({ type: 'CLOSE_PROVIDER_CREATE_MODAL' })
    seteditModalVisible(false)
  };
  
  const handleEditModal = (id , data) =>{
    setEditData(data);
    setEditId(id)
    store.dispatch({ type: 'OPEN_PROVIDER_CREATE_MODAL' })
    seteditModalVisible(true)
  }

  useEffect(() => {
    console.log('poooops', props)
  })

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: text => <a>{text}</a>,
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
                <Select className="selectBox">
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="demo">Demo</Select.Option>{' '}
                  <Select.Option value="demo">Demo</Select.Option>{' '}
                  <Select.Option value="demo">Demo</Select.Option>{' '}
                  <Select.Option value="demo">Demo</Select.Option>{' '}
                  <Select.Option value="demo">Demo</Select.Option>{' '}
                  <Select.Option value="demo">Demo</Select.Option>
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
export default ProviderTable;
