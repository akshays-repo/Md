import React, { useEffect } from 'react'
import { store } from 'reducers/configureStore'
import { Redirect } from 'react-router';
const LogOut = () => {
    useEffect(() =>{
    store.dispatch({ type: 'USER_LOGOUT' });
    })
    return(
        <Redirect to="/"></Redirect>
    )
}
export default LogOut