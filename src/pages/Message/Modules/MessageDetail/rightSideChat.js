import React from 'react'
import './style.scss'

const RightSideChat = ({message}) =>{
    return(
        <div className="rightside-chat">
            <div className="msgbox">
                <div className="content">
                <p>{message}</p>
                
                </div>
            </div>
        </div>
    )
}
export default RightSideChat