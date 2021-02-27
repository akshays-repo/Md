import React from 'react';
import Dashboard_Content from '..'
const Dashboard_Analytics = () =>{
    const Analytics = () =>{
        return(
            <div>
            <div className="pageTitle">
          <h4>ANALYTICS</h4>
        </div>            </div>
        )
    }
    return <Dashboard_Content content={Analytics()} />
}

export default Dashboard_Analytics