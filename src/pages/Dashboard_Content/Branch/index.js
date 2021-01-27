import React from 'react';
import Dashboard_Content from '..'

const Dashboard_Branch = () =>{
    const Branch = () =>{
        return(
            <div>
            Branch
            </div>
        )
    }
    return <Dashboard_Content content={Branch()} />
}

export default Dashboard_Branch