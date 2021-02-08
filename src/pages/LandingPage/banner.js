import React from 'react'
import { Row, Col } from 'antd';
import doctorImg from './assets/images/doctor.png'

const FossilMdBanner = () =>{
    return(
        <div>
            <div className="landing-banner">
<div className="container">
    <Row>
    <Col span={10}>
        <div className="doctorPic">
            <img src={doctorImg}/>
        </div>
    </Col>
    <Col span={14}>
    <div className="caption">
        <h3 style={{color: '#69b9ff'}}>Amet consectetur adipisicing elit sed do eiusmod</h3>
        <h1>Search Doctor</h1>
<h2 >Make an Appointment</h2>
    </div>
    </Col>
    </Row>
</div>

            </div>
        </div>
    )
}
export default FossilMdBanner