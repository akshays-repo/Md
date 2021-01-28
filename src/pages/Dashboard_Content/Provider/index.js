import React from 'react';
import {Col, Row, Space } from 'antd';
import Dashboard_Content from '..'
import FossilBreadCrumb from 'fossilmdComponents/FossilBreadCrumb';
import AppointmentTypes from './appointmentType';
const Dashboard_Provider = () =>{
    const ScheduleTiming = () =>{
        const weekDays = [
            {   key :1,
                day:"Sunday"

            },
            {   key :2,
                day:"Monday"

            },{   key :3,
                day:"Tuesday"

            },{   key :4,
                day:"Wednesday"

            },{   key :5,
                day:"Thursday"

            },
            {   key :6,
                day:"Friday"

            },
            {   key :7,
                day:"Saturday"

            },
        ]
        return (
          <div>
            Schedule Timings
            <form action="/action_page.php">
              <label for="minutes">Time Slot Duration:</label>
              <select id="minutes" name="cars">
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="40">40 min</option>
                <option value="45">45</option>
              </select>
              <input type="submit" value="Submit" />
            </form>
            <div>
              <Space direction="horizontal">
                {weekDays.map(item => (
                  <button key={item.key}>{item.day}</button>
                ))}
              </Space>
            </div>
          </div>
        );
    }
    return (
      <div className="schedule-time">
        <FossilBreadCrumb currentUrl="/schedule-timings" currentPageName="Schedule Timings"/>
        <Row>
          <Col xs={24} xl={7}>
            <div className="left-side">
            <AppointmentTypes/>
            </div>          
          </Col>

          <Col xs={24} xl={15}>
            <div className="right-side">
            {ScheduleTiming()}
            </div>
          </Col>
        </Row>
      
        </div>
    )
}

export default Dashboard_Provider