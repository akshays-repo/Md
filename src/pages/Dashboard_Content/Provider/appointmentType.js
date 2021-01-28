import React, { useEffect, useState } from 'react';
import { Space } from 'antd';
import { Form, Input, Button, Radio , Select} from 'antd';
const AppointmentTypes = () => {
  const [appointmentField , setAppointmentField] = useState([1])
  const AddNewField = () =>{
    setAppointmentField([...appointmentField , appointmentField.push(1)])

  }

  return (
    <div className="appointment-type">
      <div className="header">
        <h2>Appointment types</h2>
        <button onClick={() =>AddNewField()}>
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div>
          
      </div>
      <div className="field-section">
        {appointmentField?.map(() => (
          <div>
            <Form>
              <Form.Item label="Select">
                  <Input type="text" placeholder="Type Name"/>
                <Select>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentTypes;
