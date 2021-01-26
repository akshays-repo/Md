import React from 'react';
import Dashboard_Content from '..'

const Dashboard_MyPatients = () =>{
    const MyPatients = () =>{
        return(
            <div>
            MyPatients
            </div>
        )
    }
    return <Dashboard_Content content={MyPatients()} />
}

export default Dashboard_MyPatients