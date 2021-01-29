import React, { useState } from 'react';
import { Col, Row, Form, Input, Button, Modal, Select, Space } from 'antd';
import Dashboard_Content from '..';
import FossilBreadCrumb from 'fossilmdComponents/FossilBreadCrumb';
import AppointmentTypes from './appointmentType';
import ProviderCreationForm from './providerCreationForm';
import ProviderTable from './providerTable';

const Dashboard_Provider = () => {
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
  const HeaderSection = () => {
    const weekDays = [
      { key: 1, day: 'Sunday' },
      { key: 2, day: 'Monday' },
      { key: 3, day: 'Tuesday' },
      { key: 4, day: 'Wednesday' },
      { key: 5, day: 'Thursday' },
      { key: 6, day: 'Friday' },
      { key: 7, day: 'Saturday' },
    ];

    return (
      <div className="provider">
        <div className="header">
          <div></div>

          <div>
            <Button type="primary" onClick={showModal} className="button-square">
              Create a New Provider
            </Button>
          </div>
        </div>

        {/* <div>
              <Space direction="horizontal">
                {weekDays.map(item => (
                  <button key={item.key}>{item.day}</button>
                ))}
              </Space>
            </div> */}
      </div>
    );
  };
  return (
    <div className="schedule-time">
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <ProviderCreationForm />
      </Modal>
      <FossilBreadCrumb currentUrl="/provider" currentPageName="Provider" />
      <Row>
        <Col xs={24} xl={7}>
          <div className="left-side">
            <AppointmentTypes />
          </div>
        </Col>

        <Col xs={24} xl={15}>
          <div className="right-side">
            <div>{HeaderSection()}</div>
            <div>
              <ProviderTable />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard_Provider;
