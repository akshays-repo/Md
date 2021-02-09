import React from 'react';
import { Row, Col, Carousel, Avatar } from 'antd';
import Quote from './assets/images/quote.png'
import TestimonialBanner from './assets/images/testimonialBanner.png'

const FossilMdTestimonial = () => {
  const contentStyle = {
    // height: '400px',
    // lineHeight: '400px',
    textAlign: 'center',
    background: 'black',
  };
  return (
    <div className="landing-testimonials mt10 pt14 pb14">
        <div className="container" style={{display: 'block'}}>
<div className="carouselSlider">
  
        <Row>
        <Col xs={24} sm={12} lg={14}>
            <div className="testimonial_header mb10">
<div className="titleCaption">
What our <br/>
client’s say?
</div>
            </div>
          <Carousel autoplay>

              <div className="quoteBox" style={contentStyle}>
                 <p className="lead">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
                  Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                 </p>
                 <div className="testimonialFooter">
                         <div className="quotePic">
                         <Avatar  src={Quote} />

                     </div>
                     <div className="name pl-3">
                     Jesica Smith
                     </div>
                     </div>
                 </div>
   



              <div className="quoteBox" style={contentStyle}>
              <p className="lead">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
                  Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                 </p>
                 <div className="testimonialFooter">
                     
                     <div className="quotePic">
                     <Avatar src={Quote} />
                     </div>
                     <div className="name pl-3">
                     Jesica Smith
                     </div>
                   
                 </div>
              </div>
       

       
              <div className="quoteBox" style={contentStyle}>
              <p className="lead">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
                  Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                 </p>
                 <div className="testimonialFooter">
                    
                     <div className="quotePic">
                     <Avatar src={Quote} />
                     </div>
                     <div className="name pl-3">
                     Jesica Smith
                     </div>
                    
                 </div>
              </div>
           

            
          </Carousel>
        </Col>

        <Col xs={24} sm={12} lg={10}>

<div className="banner">
  <img src={TestimonialBanner} />
</div>

        
        </Col>
      </Row>
      </div>
      
    </div>
    </div>
  );
};
export default FossilMdTestimonial;
