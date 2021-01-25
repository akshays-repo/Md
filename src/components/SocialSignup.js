import React from 'react';
import { GoogleLogin } from 'react-google-login';
import FacebookLoginWithButton from 'components/SocialMedia/facebook/facebook-with-button';
import { connect } from 'react-redux';
import { userActions } from 'redux/actions';

const SocialSignup = ({ dispatch }) => {
  const responseGoogle = response => {
    console.log(response);
    if (response && response.profileObj) {
      dispatch({
        type: userActions.GBLOGIN,
        payload: {
          email: response.profileObj.email,
          name: response.profileObj.name,
          id: response.profileObj.googleId,
        },
      });
    }
  };

  const responseFacebook = response => {
    console.log(response);
    if (response && response.email) {
      dispatch({
        type: userActions.FBLOGIN,
        payload: {
          email: response.email,
          name: response.name,
          id: response.id,
        },
      });
    }
  };

  return (
    <div className="py-3 connect-social">
      <a href="">
        {/* <i className="fa fa-google mr-2 border-right pr-2" />
      Google */}
        <GoogleLogin
          // className="log-google p-2 mb-2 text-center rounded letter-tras"
          // clientId="891830764310-e0qh1p7236786tpvarco5ktqfvbr1v20.apps.googleusercontent.com"
          clientId="359928557903-lq8m90uqsprt8jcr3h01qtmas5eu5697.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        />
      </a>
      <a href="" className='log-facebook'>
        {/* <i className="fa fa-facebook mr-2 border-right pr-2" />
      Facebook */}
        <FacebookLoginWithButton
          cssClass="log-facebook"
          appId="244406493450972"
          fields="name,email,picture"
          // autoLoad
          callback={responseFacebook}
          icon="fa-facebook"
        />
      </a>
    </div>

    // {/* <div className="social-signup-btns"> */}
    //   {/* <FacebookLoginWithButton
    //     appId="244406493450972"
    //     fields="name,email,picture"
    //     // autoLoad
    //     callback={responseFacebook}
    //     icon="fa-facebook"
    //   /> */}

    //   {/* <button type="button" className="social-btn google-btn">
    //       <span className="social-icon">
    //         <i className="fab fa-google" />
    //       </span>
    //       Google
    //     </button> */}
    //   {/* <GoogleLogin
    //     // clientId="891830764310-e0qh1p7236786tpvarco5ktqfvbr1v20.apps.googleusercontent.com"
    //     clientId="359928557903-lq8m90uqsprt8jcr3h01qtmas5eu5697.apps.googleusercontent.com"
    //     buttonText="Login"
    //     onSuccess={responseGoogle}
    //     onFailure={responseGoogle}
    //     cookiePolicy="single_host_origin"
    //   /> */}
    // {/* </div> */}
  );
};

export default connect(({ user }) => ({ user }))(SocialSignup);
