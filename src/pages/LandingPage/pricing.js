import React, { useEffect } from 'react';
import { Row, Col } from 'antd';

const FossilMdPricing = (props) => {
  const PricingData = [
    {
      
      price: '$249',
      sub: 'Month',
      title: 'Standard',
      contents: [
        'Online booking',
        'Appointment reminders',
        'Online reviews',
        'Patient messaging',
        
        'Virtual waitlist',
        'Online forms',
        'Online payments',
        'Patient recall',
        'No show & cancellations',
      ],
    },
    {
     
      price: '$249',
      sub: 'Month',
      title: 'Advanced',
      contents: [
        'Online booking',
        'Appointment reminders',
        'Online reviews',
        'Patient messaging',
        
        'Virtual waitlist',
        'Online forms',
        'Online payments',
        'Patient recall',
        'No show & cancellations',
      ],
    },
    {
    
      price: '$249',
      sub: 'Month',
      title: 'Standard',
      contents: [
        'Online booking',
        'Appointment reminders',
        'Online reviews',
        'Patient messaging',
        
        'Virtual waitlist',
        'Online forms',
        'Online payments',
        'Patient recall',
        'No show & cancellations',
      ],
    },
  ];



useEffect(() =>{
console.log("!2323", props)
})
  return (
    <div>
      <div className="landing_pricing">
        <div className="container">
          <div className="pricing_section">
            <Row>
              <Col lg={24}>
                <div className="pricing_head">
                  <h1>Pricing</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
                    gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                  </p>
                </div>
              </Col>
            </Row>
            <div className="listedPrice mt10">
              <Row>
                {PricingData.map(item => (
                  <Col xs={24} lg={8}>
                    <div className="pricinBox">
                        <div className="header">
                    
                      <span className="price">{item.price}</span><span className="sub">{item.sub}</span>
                      <h2>{item.title}</h2>
                      </div>
                      <div className="priceBody mt6">
                      {item.contents.map(content => (
                      <p> <span className="listing">{content}</span><span><i class="fa fa-check"></i></span></p>
                      
                      ))}
                      <div className="text-center mb6">
                      <button className="btn theme_button mt6">Request Price</button>
                      </div>
                      </div>
                    </div>

                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FossilMdPricing;
