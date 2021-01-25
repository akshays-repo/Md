/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';

class BreadCrumbs extends Component {
  state = {
    // breadcrumbs: [],
  };

  render() {
    const { bread } = this.props;
    const breadFiltered = bread.filter((item, index, array) => index < array.length - 1);
    const breads = breadFiltered.map(item => {
      // console.log(item.url)
      return (
        <React.Fragment key={item.url}>
          <Breadcrumb.Item>
            <a href={item.url}>{item.text}</a>
          </Breadcrumb.Item>
        </React.Fragment>
      );
    });
    // console.log(bread)
    if (breads.length > 0)
      return (
        <div className="left m-3">
          <Breadcrumb>
            {breads}
            <Breadcrumb.Item key={bread[bread.length - 1].text}>{bread[bread.length - 1].text}</Breadcrumb.Item>
          </Breadcrumb>

        </div>
      );
    return null;
  }
}

BreadCrumbs.propTypes = {
  bread: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string,
    }),
  ),
};

export default BreadCrumbs;
