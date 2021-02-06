import React from 'react'
import './style.scss'
const LeftSideChat = ({message}) =>{
    return(
        <div className="leftside-chat">
            <div className="msgbox">
                <div className="content">
                <p>{message} time</p> 
                </div>
            </div>
        </div>
    )
}
export default LeftSideChat