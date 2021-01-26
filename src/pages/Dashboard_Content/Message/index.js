import React from 'react';
import Dashboard_Content from '..'

const Dashboard_Message = () =>{
    const Messages = () =>{
        return(
            <div>
            Messages
            </div>
        )
    }
    return <Dashboard_Content content={Messages()} />
}

export default Dashboard_Message