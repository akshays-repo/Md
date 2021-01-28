import React from 'react';
import Dashboard_Content from '..'
import { Calendar } from 'antd';
const Dashboard_Calendar = () =>{
    const Calendar = () =>{
        return(
            <div>
          <Calendar onPanelChange={onPanelChange} />
            </div>
        )
    }
    return <Dashboard_Content content={Calendar()} />
}

export default Dashboard_Calendar