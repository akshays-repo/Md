import React from 'react';
import FossilMdBanner from './banner';
import FossilMdAbout from './about';
import FossilMdPricing from './pricing';
import FossilMdAdd from './add';
import FossilMdTestimonial from './testimonials';
import FossilMdSteps from './steps';
import Header from './header';
import FossilMdFooter from './footer';
const FossilMdLandingPage = () => {
  return (
    <div className="landing-page-main">
      <div className="landing-header">
        <Header/>
      </div>
      <div>
        <FossilMdBanner />
      </div>
      <div>
        <FossilMdAbout />
      </div>
      <div>
        <FossilMdSteps />
      </div>
      <div>
        <FossilMdPricing />
      </div>
      <div>
        <FossilMdTestimonial />
      </div>
      <div>
        <FossilMdAdd />
      </div>
      <div>
<FossilMdFooter/>
      </div>
    </div>
  );
};
export default FossilMdLandingPage;
