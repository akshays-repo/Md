import React from 'react';
import PropTypes from 'prop-types';
// import { SaveButton } from 'components/Button'

const Panel = ({
  children,
  className,
  menuItem,
  id,
  isValidated,
  isCompleted,
  canGoBack,
  currentIndex,
  // onPrevClick, onNextClick, totalSteps
}) => {
  console.log(menuItem, id, isValidated);
  console.log(currentIndex, canGoBack);
  console.log(isCompleted);
  return (
    <div className="col-lg-8">
      <div className={className}>{children}</div>
      {/* {canGoBack && currentIndex > 0 && (
        <SaveButton type="button" onClick={onPrevClick}>
          Back
        </SaveButton>
      )}
      {currentIndex < totalSteps && (
        <SaveButton type="button" onClick={onNextClick}>
          Next
        </SaveButton>
      )} */}
    </div>
  );
};

Panel.propTypes = {
  className: PropTypes.string,
  menuItem: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
  isValidated: PropTypes.bool,
};

Panel.defaultProps = {
  className: 'white-border-box mt-10',
  isValidated: false,
};

export default Panel;
