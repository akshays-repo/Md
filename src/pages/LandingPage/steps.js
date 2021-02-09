import React from 'react';
import { Row, Col } from 'antd';
import icon1 from './assets/images/icon-1.png';
import icon2 from './assets/images/icon-2.png';
import icon3 from './assets/images/icon-3.png';
import icon4 from './assets/images/icon-4.png';

const FossilMdSteps = () => {
  return (
    <div className="landingSteps">
      <div className="processWrapper">
        <div className="container">
          <Row className="w100">
            <Col span={24}>
              <div className="heading">
                <h1>
                  <span className="lightFont">Connect with</span> Patients{' '}
                  <span className="lightFont">any</span> Time, Anywhere
                </h1>
                <h3 style={{ color: 'rgb(5, 214, 231)' }}>Appointment Process</h3>
              </div>
            </Col>
          </Row>
          <div className="stepsAppointment mt6">
            <Row>
              <Col span={6}>
                <div className="whiteBox">
                  <div className="stepRound boxStart">1</div>
                  <div className="iconBox">
                    <img src={icon1} />
                  </div>
                  <div className="footerCaption">
                    <h5>Appointment Reminder</h5>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="whiteBox">
                  <div className="stepRound boxStart">2</div>
                  <div className="iconBox">
                    <img src={icon2} />
                  </div>
                  <div className="footerCaption">
                    <h5>Chat</h5>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="whiteBox">
                  <div className="stepRound boxStart">3</div>
                  <div className="iconBox">
                    <img src={icon3} />
                  </div>
                  <div className="footerCaption">
                    <h5>Booking Reminder</h5>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="whiteBox">
                  <div className="stepRound boxStart">4</div>
                  <div className="iconBox">
                    <img src={icon4} />
                  </div>
                  <div className="footerCaption">
                    <h5>Review Doctor</h5>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FossilMdSteps;
