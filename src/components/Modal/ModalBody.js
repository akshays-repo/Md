import React from 'react'
import PropTypes from 'prop-types'

const ModalBody = ({ children }) => {
  return <div className="modal-body">{children}</div>
}

ModalBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.any), PropTypes.element]).isRequired,
}

export default ModalBody
