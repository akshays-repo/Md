import React from 'react';
import Dashboard_Content from '..'

const Dashboard_Templates = () =>{
    const Templates = () =>{
        return(
            <div>
            Templates
            </div>
        )
    }
    return <Dashboard_Content content={Templates()} />
}

export default Dashboard_Templates