import React , {useEffect} from 'react';
import FossilMdBanner from './banner';
import FossilMdAbout from './about';
import FossilMdPricing from './pricing';
import FossilMdAdd from './add';
import FossilMdTestimonial from './testimonials';
import FossilMdSteps from './steps';
import Header from './header';
import FossilMdFooter from './footer';
import { actionCreator } from '../../reducers/actionCreator';
import { store } from '../../reducers/configureStore';
import { connect } from 'react-redux';

const FossilMdLandingPage = (props) => {


  useEffect(() => {
    props.fetchModules({status:'active'})
  }, [])
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
        <FossilMdPricing packages={props.packages}/>
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

const mapStoreToProps = ({ LandingPage }) => {
  console.log('state', LandingPage);
  return {
    payload: LandingPage.payload,
    error: LandingPage.error,
    message: LandingPage.message,
    modal: LandingPage.modal,
    modal1: LandingPage.modal1,
    changed:LandingPage.changed,
    packages:LandingPage.packages
  };
};
const mapDispatchToProps = dispatch => ({
  fetchModules: (param) => dispatch(actionCreator({ method: 'GET', action_type: 'LANDING_PAGE_PACKAGES'  , param})),

});

export default connect(mapStoreToProps, mapDispatchToProps)(FossilMdLandingPage);
