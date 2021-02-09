import React from 'react'
import { Row, Col } from 'antd';


const FossilMdFooter = () =>{
    return(
        <div>
            <div className="footer">
<div className="container">
    <Row>
    <Col xs={24} sm={12} lg={10}>
  <div className="contact">
      <h3>Contact Us</h3>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse facilisis. 
      </p>
  </div>
    </Col>
    <Col xs={24} sm={12} lg={14}>
<div className="footerInfo">
    <div className="socilMenu">
        <span>Follow Us : </span>
        <span><i class="fab fa-facebook-f"></i></span>
        <span><i class="fab fa-twitter"></i></span>
    </div>
    <div className="info">
        <p><span><i class="fas fa-phone pr3"></i></span>+1800 00 000 00 00</p>
        <p><span><i class="fas fa-envelope pr3"></i></span>info@fossilmd.com</p>
    </div>
</div>
    </Col>
    </Row>
</div>

            </div>
        </div>
    )
}
export default FossilMdFooter