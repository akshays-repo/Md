import React from 'react';
import PropTypes from 'prop-types';

const redColor = {
  color: 'red',
};

const checkIconStyle = {
  color: 'rgb(57, 141, 159)',
};
const Toaster = ({ text, icon, children, onClose, error, success }) => {
  const wrapperStyle = { transform: 'translateY(0%) scale(1)' };
  return (
    <div className="Toaster__message-wrapper" style={wrapperStyle}>
      <div data-reach-alert="true">
        <div id="5" className="Toaster__alert">
          {icon && <div className="toaster-icon">{icon}</div>}
          {error && (
            <div className="toaster-icon">
              <i className="fas fa-times-circle" style={redColor} />
            </div>
          )}
          {success && (
            <div className="toaster-icon">
              <i style={checkIconStyle} className="fas fa-check-circle" />
            </div>
          )}
          {text && <div className="Toaster__alert_text">{text}</div>}
          {children}
          <button
            onClick={onClose}
            className="Toaster__alert_close"
            type="button"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Toaster.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Toaster;
