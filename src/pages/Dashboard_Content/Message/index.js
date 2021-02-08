import React from 'react';
import MessageLayout from 'pages/Message/Modules';
import Dashboard_Content from '..'

const Dashboard_Message = () =>{
    const Messages = () =>{
        return(
            <div >
            <MessageLayout/>
            </div>
        )
    }
    return <Dashboard_Content content={Messages()} />
}

export default Dashboard_Message