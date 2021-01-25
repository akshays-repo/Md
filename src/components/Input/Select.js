import React from 'react';
import PropTypes from 'prop-types';

const Select = props => {
  const { options, errors, name, onChange, onBlur, value } = props;
  return (
    <div className="filter-selectbox">
      <select value={value} name={name} onChange={onChange} onBlur={onBlur} id="">
        {options.map(i => (
          <option
            key={i.value}
            value={i.value || ''}
            hidden={i.hidden}
            // selected={i.selected}
            disabled={i.disabled}
          >
            {i.label || ''}
          </option>
        ))}
      </select>
      {errors && <div className="error-message">{errors}</div>}
    </div>
  );
};

Select.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

Select.defaultProps = {
  onChange: null,
};

export default Select;
