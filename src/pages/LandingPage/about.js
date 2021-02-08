 import React from 'react'
 import {Row, Col,  } from 'antd';
import AboutImg from './assets/images/about_img.png'


const FossilMdAbout =() =>{
    return (
        <div className="landing-about">
<div className="aboutSection pt14 pb14">
<Row>
<div className="container">
      <Col span={12}>
          <div className="about_left">
         <img className="circular-square" src={AboutImg} />
          </div>
      </Col>
      <Col span={12}>
          <div className="aboutText">
              <h4 style={{color: '#05d6e7'}}>ABOUT FOSSILMD</h4>
              <div className="titleCaption">
              Bring care to your home with one click
              </div>
              <div className="about_content pt12 pb12">
                  <p>
                  Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod ex tempor incididunt labore dolore magna aliquaenim ad minim veniam quis nostrud exercitation
<br/><br/>
ullamco laboris. Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod ex tempor incididunt labore dolore magna aliquaenim ad minim veniam quis nostrud exercitation ullamco laboris.
                  </p>
                  <button type="button" className="btn theme_button mt6">About US</button>
          </div>
          </div>
      </Col>
      </div>
    </Row>

    </div>
    </div>

    )
}
export default FossilMdAbout