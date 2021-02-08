import React from 'react'
import FossilMdBanner from './banner'
import FossilMdAbout from './about'
import FossilMdPricing from './pricing'
import FossilMdAdd from './add'
import FossilMdTestimonial from './testimonials'
import FossilMdSteps from './steps'


const FossilMdLandingPage = () =>{
    return(
        <div className="landing-page-main">
            <div  className="landing-header">
            </div>
            <div>
            <FossilMdBanner/>
            </div>
            <div>
                <FossilMdAbout/>
            </div>
            <div>
                <FossilMdSteps/>
            </div>
            <div>
                <FossilMdPricing/>
            </div>
<div>
    <FossilMdTestimonial/>
</div>
            <div>
                <FossilMdAdd/>
            </div>
        </div>
    )
}
export default FossilMdLandingPage