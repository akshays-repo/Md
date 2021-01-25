import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';
// import toaster from 'toasted-notes';
// import toaster from 'toasted-notes'

class Authorize extends Component {
  render() {
    const { children, redirect, user, fallback, noRedirect } = this.props;
    if (!user.isLogged) {
      // toaster.notify('You are not logged in!');
      if (fallback) return fallback;
      
      return !noRedirect && <Redirect to={redirect || '/'} />;
    }
    return children;
  }
}

Authorize.defaultProps = {
  noRedirect: false,
};

export default withRouter(connect(({ user }) => ({ user }))(Authorize));
