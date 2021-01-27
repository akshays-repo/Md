import React, { useState } from 'react';
import Dashboard_Content from '..';
import { Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import BranchCreationForm from './branchCreation';
import BranchListTable from './branchListTable';


const Dashboard_Branch = () => {
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

  const Branch = () => {
    return (
      <div>
        <div className="header">
          <Button type="primary" onClick={showModal}>
              Create a New Branch
          </Button>
          <Modal
            title="Create A Branch"
            visible={isModalVisible}
            onCancel={handleCancel}
            width={600}
            footer={null}>
            <BranchCreationForm/>
          </Modal>
        </div>
        <div className="table-content">
          <BranchListTable/>
        </div>
      </div>
    );
  };
  return <Dashboard_Content content={Branch()} />;
};

export default Dashboard_Branch;
