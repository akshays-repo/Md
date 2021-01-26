import React from 'react';
import Dashboard_Content from '..'

const Dashboard_Calendar = () =>{
    const Calendar = () =>{
        return(
            <div>
            Calendar
            </div>
        )
    }
    return <Dashboard_Content content={Calendar()} />
}

export default Dashboard_Calendar