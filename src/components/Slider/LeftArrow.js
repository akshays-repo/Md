/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react'

const LeftArrow = ({goPrevClick}) => {
  return (
    <div className="backArrow" role="button" onKeyDown={goPrevClick} onClick={goPrevClick}>
      <i className="fa fa-arrow-left fa-2x" aria-hidden="true" />
    </div>
  )
}

export default LeftArrow
