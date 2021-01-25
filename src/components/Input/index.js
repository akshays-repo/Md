/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const StyledIconWrapper = styled.div`
position:absolute;
right:0;
i{
  border:none;
  padding:none;

}

`

export const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.

  ...props
}) => {
  return (
    <div className="col-xl-6 col-lg-6 form-group">
      <input className="form-control" {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error-field">{errors[field.name]}</div>
      )}
    </div>
  )
};

const InputComponent = ({
  className,
  onChange,
  placeholder,
  onBlur,
  value,
  name,
  errors,
  password,
  type: setType,
  label,
  radio,
  icon,
  ...props
}) => {
  let type = setType;
  const [passType, togglePassView] = useState(type === "password" ? "password" : "text")
  if (radio) type = 'radio';
  const handleTogglePass = () => togglePassView(prev => (prev === "password") ? "text" : "password")
  // console.log(errors);
  return (
    /* {label && !radio && (
        <label htmlFor={name} className={classNames('form-label')}>
          {label}
        </label>
      )} */
    <div>
      <div className="input-container">
        {icon && <i className={`fa fa-${icon} icon`} />}
        <input
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          type={type === "password" ? passType : type}
          className={classNames('form-control', className, {
            'radio-button': radio,
            'error-border': errors,
          })}

          // className={`form-control ${className || ''} ${}`}
          value={value}
          name={name}
          {...props}
        />
        {type === "password" && (
          <StyledIconWrapper type={type} onClick={handleTogglePass}>
            <i className={classNames("far", { "fa-eye": passType === "password", "fa-eye-slash": passType === "text" })} />
          </StyledIconWrapper>
        )}
      </div>
      {label && radio && (
        <label htmlFor={name} className={classNames('form-check-label')}>
          {label}
        </label>
      )}
      {errors && <div className="error-message">{errors}</div>}
    </div>
  );
};

export const RadioButtona = ({ name, value, onChange, id, label, ...props }) => {
  // console.log(name, value)
  return (
    <div className="form-check">
      <label htmlFor={id}>{label}</label>
      <input
        name={name}
        type="radio"
        value={value}
        onChange={onChange}
        className={classNames('radio-button')}
        {...props}
      />
    </div>
  );
};

export const RadioButton = props => {
  return <InputComponent radio {...props} />;
};

export const TextArea = ({
  cols,
  rows,
  onChange,
  name,
  onBlur,
  value,
  className,
  style,
  errors,
}) => {
  return (
    <>
      <textarea
        cols={cols}
        rows={rows}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={classNames(className, 'form-control',{ 'error-border': errors })}
        style={style}
      />
      {errors && <div className="error-message">{errors}</div>}
    </>
  );
};

TextArea.propTypes = {
  cols: PropTypes.string,
  rows: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  // value: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  // errors: PropTypes.string,
};

TextArea.defaultProps = {
  cols: '18',
  rows: '10',
  className: 'form-control',
  style: { height: '70px' },
  onChange:null,
  onBlur:null,
  name:'null',
  // value: '',
  // errors: '',
};

InputComponent.defaultProps = {
  placeholder: '',
  type: "text"
};

export default InputComponent;
