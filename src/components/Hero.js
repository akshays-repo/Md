import React from 'react'

const Hero = ({ image, children }) => {
  return (
    <div className="login-image-area-wrapper">
      <img src={image} alt="" className="lazy login-bg" />
      {children}
    </div>
  )
}

export default Hero
