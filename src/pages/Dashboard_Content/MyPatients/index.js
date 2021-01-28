import React , {useState} from 'react';
import { Table, Tag, Space } from 'antd';
import Dashboard_Content from '..';
import PatientCreationForm from './patientCreationForm';
import { Modal } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Blood Group',
    dataIndex: 'bloodgroup',
    key: 'bloodgroup',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    id: 'New York No. 1 Lake Park',
    phone: '',
    bloodgroup: '',
  },
  {
    key: '2',
    name: 'John Brown',
    age: 32,
    id: 'New York No. 1 Lake Park',
    phone: '',
    bloodgroup: '',
  },
  {
    key: '3',
    name: 'John Brown',
    age: 32,
    id: 'New York No. 1 Lake Park',
    phone: '12486258',
    bloodgroup: 'AB',
  },
];

const Dashboard_MyPatients = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const MyPatients = () => {
    return (
      <div>
        <div className="search">
          <form>
            <input type="text" placeholder="Search by Name or ID" />
            <button>Search</button>
          </form>
          <button type="primary" onClick={showModal}>
              Create a New Branch
          </button>
          <Modal
            title="Create A Branch"
            visible={isModalVisible}
            onCancel={handleCancel}
            width={600}
            footer={null}>
            <PatientCreationForm/>
          </Modal>
        </div>
        <div className="patient_name"></div>
        <Table columns={columns} dataSource={data} />,
      </div>
    );
  };
  return <Dashboard_Content content={MyPatients()} />;
};

export default Dashboard_MyPatients;
