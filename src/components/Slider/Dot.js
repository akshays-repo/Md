/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'

const Dot = ({ id, onDotClick, active, image }) => {
  console.log(id)
  const opacity = active ? 1 : 0.5
  return (
    <div className="product-thumb-image-wrapper" style={{ opacity }} onClick={() => onDotClick(id)}>
      <img
        className="lazy product-thumb-image"
        src={`/${image}`}
        alt=""
      />
    </div>
  )
}

Dot.propTypes = {
    id: PropTypes.number.isRequired,
    onDotClick: PropTypes.func.isRequired,
    active: PropTypes.bool,
    image: PropTypes.string.isRequired,
}

Dot.defaultProps = {
    active: false
}

export default Dot
