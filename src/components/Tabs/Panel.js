import React from 'react'
import PropTypes from 'prop-types'

const Panel = ({ children, className }) => {
  return (
    <div className="col-lg-8">
      <div className={className}>{children}</div>
    </div>
  )
}

Panel.propTypes = {
  className: PropTypes.string,
}

Panel.defaultProps = {
  className: 'white-border-box mt-10',
}

export default Panel
