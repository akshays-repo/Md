import React from 'react';
import Dashboard_Content from '..'

const Dashboard_Campaigns = () =>{
    const Campaigns = () =>{
        return(
            <div>
            Campaigns
            </div>
        )
    }
    return <Dashboard_Content content={Campaigns()} />
}

export default Dashboard_Campaigns