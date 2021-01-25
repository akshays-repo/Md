import React from 'react';
import styled, { css } from 'styled-components';

const StyledDiv = styled.div`
  ${props => {
    return (
      props.horizontal &&
      css`
        display: grid;
        grid-template-columns: 1fr 2fr;
        /* grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); */
        @media (max-width: 767px) {
          display: block;
        }
      `
    );
  }}
`;

const FormItem = props => {

  const { children, className, label, horizontal, errors, errorPosition } = props;
  return (
    <StyledDiv horizontal={horizontal} className={`form-group ${className || ''}`}>
      {errorPosition === "above" && errors && <div className="error-message">{errors}</div>}
      <span className="form-label">{label}</span>
      {children}
      {errorPosition === "below" && errors && <div className="error-message">{errors}</div>}
    </StyledDiv>
  );
};

FormItem.defaultProps = {
  errorPosition: "below"
}

export default FormItem;
