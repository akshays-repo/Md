import React from 'react'

const Banner = ({ title, subtitle, slogan, children }) => {
  console.log('banner title', title)
  return (
    <div className="login-image-area">
      <h2 className="name-big">{title}</h2>
      <h5 className="sub-heading">{subtitle}</h5>
      <h3 className="slogan">{slogan}</h3>
      {children}
    </div>
  )
}

export default Banner
