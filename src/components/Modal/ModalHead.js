import React from 'react'
import './styles.scss'
import PropTypes from 'prop-types'

const ModalHead = ({ title, onClose, children }) => {
  return (
    <div className="modal-header">
      {title && <h5 className="modal-title">{title}</h5>}
      {children}
      <button
        type="button"
        onClick={onClose}
        className="close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

ModalHead.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOf([PropTypes.array, PropTypes.element]),
  onClose: PropTypes.func.isRequired,
}

ModalHead.defaultProps = {
  title: '',
  children: [],
}

export default ModalHead
