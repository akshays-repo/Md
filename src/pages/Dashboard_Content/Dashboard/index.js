import React from 'react';
import Dashboard_Content from '..'

const Dashboard_Dashboard = () =>{
    const Dashboard = () =>{
        return(
            <div>
            Dashboard
            </div>
        )
    }
    return <Dashboard_Content content={Dashboard()} />
}

export default Dashboard_Dashboard