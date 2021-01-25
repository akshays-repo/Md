/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react'

const smallerItem = WrappedComponent => {
  class smallerItemW extends Component {
    render(props) {
      return (
        <div className="item">
          <WrappedComponent {...props} />
        </div>
      )
    }
  }
  return smallerItemW
}

export default smallerItem
