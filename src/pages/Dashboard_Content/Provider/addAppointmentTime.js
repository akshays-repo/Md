import React, { useState } from 'react';
import { Col, Row, Select, Input, Switch } from 'antd';

const { Option } = Select;
const AddAppointmentTime = () => {
  const [appointmentField, setAppointmentField] = useState([1]);
  const AddNewField = () => {
    setAppointmentField([...appointmentField, appointmentField.push(1)]);
  };

  const weakDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const handleChange = value => {
    console.log(`selected ${value}`);
  };
  const onChange = () =>{
      //handle chnage
  }
  return (
    <div className="appointment-time">
      <div className="header">
        <button onClick={() => AddNewField()}>Add New</button>
      </div>
      {appointmentField?.map(() => (
        <div className="item">
          <Select
            mode="multiple"
            allowClear
            placeholder="Select Day"
            onChange={handleChange}
            style={{ width: '150px' }}
          >
            {weakDays.map(day => (
              <Option value={day} label={day}>
                {day}
              </Option>
            ))}
          </Select>
          {'  '}
          From:
          <Select defaultValue="09">
            <Option value="10">10</Option>
            <Option value="11">11</Option>
          </Select>{'  '}
          <Select defaultValue="00">
            <Option value="05">05</Option>
            <Option value="10">10</Option>
          </Select>{'  '}
          <Select defaultValue="AM">
            <Option value="AM">AM</Option>
            <Option value="PM">PM</Option>
          </Select>{'  '}
          To:{'  '}
          <Select defaultValue="09">
            <Option value="10">10</Option>
            <Option value="11">11</Option>
          </Select>{'  '}
          <Select defaultValue="00">
            <Option value="05">05</Option>
            <Option value="10">10</Option>
          </Select>{'  '}
          <Select defaultValue="AM">
            <Option value="AM">AM</Option>
            <Option value="PM">PM</Option>
          </Select>{'  '}
<br/>          <div className="switch-section"> 


<Switch defaultChecked onChange={onChange} />On a specific date

<Switch defaultChecked onChange={onChange} />Custom repeat
</div>

          

        </div>
      ))}
    </div>
  );
};
export default AddAppointmentTime;
