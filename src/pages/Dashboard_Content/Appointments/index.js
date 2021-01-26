import React from 'react';
import Dashboard_Content from '..'

const Dashboard_Appointments = () =>{
    const Appointments = () =>{
        return(
            <div>
            Appointments
            </div>
        )
    }
    return <Dashboard_Content content={Appointments()} />
}

export default Dashboard_Appointments