import React, { useEffect, useState } from 'react';
import { Space, Row, Col } from 'antd';
import { Form, Input, Button, Radio, Select } from 'antd';

const appointments = [
  {
    type: 'specal doctor',
    minutes: '15',
  },
  {
    type: 'specal Offer',
    minutes: '25',
  },
  {
    type: 'specal check up',
    minutes: '25',
  },
  {
    type: 'eye doctor',
    minutes: '15',
  },
];

const AppointmentTypes = () => {
  const [appointmentField, setAppointmentField] = useState([1]);
  const AddNewField = () => {
    setAppointmentField([...appointmentField, appointmentField.push(1)]);
  };

  return (
    <div className="appointment-type">
      <div className="header">
        <h2>Appointment types</h2>
        <button className="plus-button" onClick={() => AddNewField()}>
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div className="defined -field">
      {  appointments?.map((type) =>(
          <div>
          <Form>
            <Form.Item label="">
              <Space direction="horizontal">
                <Input type="text" value={`${type.type}`}  placeholder="Type Name" />
                <Select value={`${type.minutes}min`} placeholder={type.minutes}>
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="demo">Demo</Select.Option>{' '}
                  <Select.Option value="demo">Demo</Select.Option>{' '}
                  <Select.Option value="demo">Demo</Select.Option>{' '}
                  <Select.Option value="demo">Demo</Select.Option>{' '}
                  <Select.Option value="demo">Demo</Select.Option>{' '}
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Space>
            </Form.Item>
          </Form>
        </div>
        ))
      }

      </div>
      <div className="field-section">
        {appointmentField?.map(() => (
          <div>
            <Form>
              <Form.Item label="">
                <Space direction="horizontal">
                  <Input type="text" placeholder="Type Name" />
                  <Select placeholder="15 min">
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>{' '}
                    <Select.Option value="demo">Demo</Select.Option>{' '}
                    <Select.Option value="demo">Demo</Select.Option>{' '}
                    <Select.Option value="demo">Demo</Select.Option>{' '}
                    <Select.Option value="demo">Demo</Select.Option>{' '}
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Space>
              </Form.Item>
            </Form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentTypes;
