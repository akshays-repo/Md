import React from 'react';
import styled from 'styled-components';

const LikeLink = styled.div`
  cursor: pointer;
  color: #197bf6;
  &:hover{
    opacity:0.7
  }
`;

const StyledLink = ({ children, onClick }) => {
  return (
    <StyledLink
      onClick={onClick}
      role="button"
      tabIndex={-1}
      onKeyDown={onClick}
    >
      {children}
    </StyledLink>
  );
};

export default LikeLink;
