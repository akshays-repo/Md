/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

export const RadioContext = React.createContext({});

const RadioGroup = ({ children, name, onChange, onBlur, buttonStyle }) => {
  const renderChildren = () => {
    return React.Children.map(children, child => {
      if (child.type === RadioButton) return child;
      return null;
    });
  };
  return (
    <RadioContext.Provider value={{ name, onChange, onBlur, buttonStyle }}>
      <div className="radio-group">{renderChildren()}</div>
    </RadioContext.Provider>
  );
};

RadioGroup.defaultProps = {
  buttonStyle: 'regular',
};

const RadioButton = ({ children, value }) => {
  return (
    <RadioContext.Consumer>
      {({ buttonStyle, name, onChange, onBlur }) => {
        return (
          <div className="form-controla radio">
            <div className="radio-wrapper">
              <input type="radio" name={name} value={value} />
              <label htmlFor={value}>{children}</label>
            </div>
          </div>
        );
      }}
    </RadioContext.Consumer>
  );
};

RadioButton.propTypes = {
  children: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
};

RadioGroup.Button = RadioButton;

export default RadioGroup;
