import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  min-height:753px;
`;

const PageSection = ({ children }) => {
  return <StyledSection className="inner-page-wrapper">{children}</StyledSection>;
};

export default PageSection;
