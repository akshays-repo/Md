import React from 'react';
import PropTypes from 'prop-types';

class DelayLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidden: true };
  }

  componentDidMount() {
    const { delay } = this.props;
    setTimeout(() => {
      this.setState({ hidden: false });
    }, delay);
  }

  render() {
    const { hidden, loader } = this.state;
    const { loading, children } = this.props;
    return hidden || (!hidden && loading) ? loader : children;
  }
}

DelayLoading.propTypes = {
  delay: PropTypes.number.isRequired,
};

export default DelayLoading;
