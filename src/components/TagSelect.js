import React from 'react';
import styled from 'styled-components';
import Badge from './Badge';

// ${props => console.log(props)};
const StyledTagWrapper = styled.div`
  display: flex;
  flex-wrap:wrap;
  margin: 1rem 0;
  > *{
      margin:5px 5px;
  }
`;

const StyledClose = styled.span`
  margin-left: 0.5rem;
  cursor: pointer;
`;
/**
 *
 * @param {object} options
 * @param {string} label
 * @param {string} value
 * @param {string} type optional
 */
const TagSelect = ({ onClose, closeable, options }) => {
  const handleClose = React.useCallback(
    (value, type) => {
      if (onClose) onClose(value, type);
    },
    [onClose],
  );

  return (
    <StyledTagWrapper hello="hi">
      {options.map(i => {
        const { disableSelection = false } = i;
        return (
          <Badge key={i.value} closeable onClose={onClose}>
            {i.label}
            {closeable && !disableSelection && (
              <StyledClose
                role="button"
                tabIndex={-1}
                onClick={() => handleClose(i.value, i.type)}
                onKeyDown={() => handleClose(i.value, i.type)}
              >
                <i className="fa fa-times" />
              </StyledClose>
            )}
          </Badge>
        )})}
    </StyledTagWrapper>
  );
};

TagSelect.defaultProps = {
  closeable: true,
};

export default TagSelect;
