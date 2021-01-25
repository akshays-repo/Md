import React from 'react'
import PropTypes from 'prop-types'
import Dot from './Dot'

const Dots = ({ images, activeIndex, onDotClick }) => {
  console.log(images)
  const dotGroup = images.map((item) => (
    <Dot key={item.id} active={activeIndex === item.id} id={item.id} onDotClick={(a) => {console.log(a); onDotClick(a)}} image={item.image} />
  ))
  return <div className="product-thumb-slider-wrapper">{dotGroup}</div>
}

Dots.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
    }),
  ).isRequired,
  activeIndex: PropTypes.number.isRequired,
  // activeIndex: PropTypes.string.isRequired,
  onDotClick: PropTypes.func.isRequired,
}

export default Dots
