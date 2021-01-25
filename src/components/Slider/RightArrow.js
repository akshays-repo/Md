/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react'

const RightArrow = ({goNextClick}) => {
  return (
    <div className="nextArrow" role="button" onClick={goNextClick} onKeyDown={goNextClick}>
      <i className="fa fa-arrow-right fa-2x" aria-hidden="true" />
    </div>
  )
}

export default RightArrow
