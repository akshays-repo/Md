import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import omit from 'lodash/omit';

const StyledIconContainer = styled.div`
  padding: 5px;
  /* background-color: white;
      color: $primaryBgColor; */
  color: white;
  transition: all ease-in 0.4s;
  opacity: 0.5;
  /* float: right; */
  /* margin-right: -6px; */
  /* margin-left: 37px; */
  /* margin-top: -14px; */
  &:hover {
    cursor: pointer;
    opacity: 1;
    /* color: black; */
    /* color: white;
        background-color: $primaryBgColor; */
  }
`;

const Icon = props => {
  const { solid, regular, children, type } = props;
  const restProps = omit(props, ['solid', 'regular', 'children', 'icon']);
  
  return (
    <StyledIconContainer>
      <i
        {...restProps}
        className={classNames(
          {
            fas: solid,
            far: regular,
          },
          `fa-${type}`,
        )}
      />
      {children}
    </StyledIconContainer>
  );
};

Icon.defaultProps = {
  regular: false,
  solid: true,
};

export default Icon;
