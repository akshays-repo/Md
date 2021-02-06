import React, { useEffect, useState } from 'react'
import { store } from '../../../reducers/configureStore';

const ProviderTypeForm = (props) =>{

    const [branchList , setBranchList] = useState([])
    useEffect(() =>{
        console.log("TPROOOPS", props, )
        setBranchList(store.getState().Branch.payload)
    },)
    return(
        <div>

        </div>
    )
}

export default ProviderTypeForm