import React from 'react';
import {Space } from 'antd';
import Dashboard_Content from '..'

const Dashboard_ScheduleTiming = () =>{
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
    return <Dashboard_Content content={ScheduleTiming()} />
}

export default Dashboard_ScheduleTiming