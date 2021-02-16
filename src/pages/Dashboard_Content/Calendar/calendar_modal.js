import React, { useState } from 'react';
import { Modal, Tabs } from 'antd';
import { NewAppointment } from './new_appointment';
import { UnavailableSlot } from './add_unavailableslot';
import { Formik } from 'formik';
const { TabPane } = Tabs;

export const CalendarModal = props => {
  const { modal, setModal } = props;
  return (
    <Modal
      className="calendar__modal"
      onCancel={() => setModal(false)}
      visible={modal}
      footer={false}
      width={600}
    >
      <Tabs className="calendar__modal__tabs" defaultActiveKey="1">
        <TabPane tab="NEW APPOINTMENT" key="1">
          <NewAppointment {...props} setModal={setModal} />
        </TabPane>
        <TabPane tab="ADD UNAVAILABLE SLOT" key="2">
          <UnavailableSlot {...props} setModal={setModal} />
        </TabPane>
      </Tabs>
    </Modal>
  );
};
