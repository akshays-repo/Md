import React from 'react';
import styled, { css } from 'styled-components';

const StyledBadge = styled.div`
  display: flex;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #298a9f;
  color: #298a9f;
  ${props =>
    props.solid &&
    css`
      background: #298a9f;
      color: #fff;
    `}

  text-transform: uppercase;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 9px;
  width: fit-content;
  margin-right: 1rem;
  ${props =>
    props.rounded &&
    css`
      border-radius: 50px;
    `}
`;

const Badge = ({ children, rounded, solid, ...rest }) => {
  return (
    <StyledBadge solid={solid} rounded={rounded} {...rest}>
      {children}
    </StyledBadge>
  );
};

Badge.defaultProps = {
  rounded: true,
  solid: false,
};

export default Badge;
