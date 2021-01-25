import React from 'react'

const Slide = ({ image }) => {
  
  return (
    <div
      className="slide"
      
      style={{
        backgroundImage: `url(/${image})`,
        backgroundSize: `contain`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `50% 60%`,
      }}
    />
  )
}

export default Slide
