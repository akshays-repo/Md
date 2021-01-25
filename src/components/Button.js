/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';

const ButtonTypes = {
  SAVE: 'save-btn',
  ADD_TO_CART: 'addto-cart-btn',
};

const StyledIcon = styled.span`
  margin-left: 10px;
`;

export const Button = ({
  className,
  title,
  onClick,
  children,
  loading,
  isSubmit,
  icon,
  danger,
  style,
  size,
  iconStyle,
}) => {
  // console.log(loading, typeof loading)
  return (
    <button
      disabled={loading}
      type={isSubmit ? 'submit' : 'button'}
      // className={`${className} ${danger ? 'red' : ''}`}
      className={classNames(className, {
        'extra-small-btn': size === 'small',
        'btn big-login-btn': size === 'regular',
        red: danger,
      })}
      onClick={onClick}
      style={style}
    >
      <span>{title}</span>
      {children}
      {loading && (
        <StyledIcon>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        </StyledIcon>
      )}
      {icon && !loading && (
        <StyledIcon>
          <i
            className={classNames(icon, {
              fas: iconStyle === 'solid',
              far: iconStyle === 'regular',
            })}
          />
        </StyledIcon>
      )}
    </button>
  );
};

export const SaveButton = props => {
  const { title } = props;
  return <Button {...props} className={ButtonTypes.SAVE} title={title} />;
};

export const SubmitButton = props => {
  const { isSubmit } = props;
  return <Button {...props} className={ButtonTypes.SAVE} loading={isSubmit} />;
};

export const AddButton = props => {
  return <Button {...props} className={ButtonTypes.ADD_TO_CART} />;
};

Button.propTypes = {
  // type: PropTypes.string,
  loading: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
  iconStyle: PropTypes.string,
};

Button.defaultProps = {
  // type: 'addto-cart-btn',
  onClick: null,
  loading: false,
  title: '',
  size: 'regular',
  iconStyle: 'solid',
};

export default Button;
