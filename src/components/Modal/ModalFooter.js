/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable react/self-closing-comp */
import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'components/Button'

const ModalFooter = ({ children }) => {
  return <div className="modal-footer">{children}</div>
}

ModalFooter.propTypes = {
    children: PropTypes.oneOf([PropTypes.arrayOf(PropTypes.instanceOf(Button),<button></button>), PropTypes.element])
}

ModalFooter.defaultProps = {
    children: "button"
}

export default ModalFooter
