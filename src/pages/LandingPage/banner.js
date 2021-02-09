import React from 'react'
import { Row, Col } from 'antd';
import doctorImg from './assets/images/doctor.png'

const FossilMdBanner = () =>{
    return(
        <div>
            <div className="landing-banner">
<div className="container">
    <Row className="mblReverse">
    <Col xs={12} lg={10}>
        <div className="doctorPic">
            <img src={doctorImg}/>
        </div>
    </Col>
    <Col xs={24} lg={14}>
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