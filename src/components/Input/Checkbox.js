import React from 'react';
import PropTypes from 'prop-types';
import has from 'lodash/has';

class Checkbox extends React.PureComponent {
  state = {
    selectedValues: [],
  };

  componentDidMount() {
    const { options } = this.props;
    this.setState(prev => {
      const selVal = [];
      options.forEach(i => {
        if (has(i, 'isSelected') && i.isSelected === true) selVal.push(i.value);
      });
      return {
        ...prev,
        selectedValues: selVal,
      };
    });
  }

  componentDidUpdate(prevProps) {
    // const { onChange, multiple } = this.props;
    // const { selectedValues: prevSelectedValues } = prevState;
    // const { selectedValues: currentSelectedValues } = this.state;
    // if (prevSelectedValues !== currentSelectedValues && onChange)
    //   onChange(multiple ? currentSelectedValues : currentSelectedValues[0]);

    const { options: prevOptions } = prevProps;
    const { options: currentOptions } = this.props;
    if (!(prevOptions === currentOptions) && has(currentOptions[0], 'isSelected'))
      this.updateSelectedValuesFromProps();
  }

  updateSelectedValuesFromProps = () => {
    const { options } = this.props;

    this.setState({
      selectedValues: options.filter(i => i.isSelected === true).map(i => i.value),
    });
  };

  handleChange = e => {
    const { multiple, onChange } = this.props;
    const { value } = e.target;
    if (multiple) {
      this.setState(
        prev => {
          if (prev.selectedValues.includes(value))
            return { ...prev, selectedValues: prev.selectedValues.filter(i => i !== value) };
          return { ...prev, selectedValues: [...prev.selectedValues, value] };
        },
        () => {
          const { selectedValues } = this.state;
          if (onChange) onChange(selectedValues);
        },
      );
    } else
      this.setState(
        prev => {
          if (value === prev.selectedValues[0]) return { selectedValues: [] };
          return { selectedValues: [value] };
        },
        () => {
          const { selectedValues } = this.state;
          if (onChange) onChange(selectedValues[0]);
        },
      );
  };

  render() {
    const { options } = this.props;
    const { selectedValues } = this.state;

    return options.map(i => {
      
      let isSelected = selectedValues.map(m => String(m)).includes(String(i.value));
      if (has(i, 'isSelected')) isSelected = i.isSelected;
      return (
        <div key={i.value} className="checkbox">
          <input
            type="checkbox"
            name={i.value}
            // onClick={onChange}
            checked={isSelected}
            disabled={i.disableSelection}
            onChange={this.handleChange}
            value={i.value}
          />
          {/* <div className="form-label">{i.label}</div> */}
          <label htmlFor={i.value} className="form-label">
            <span>{i.label}</span>
          </label>
        </div>
      );
    });
  }
}

// const RadioGroup = ({ options = null, onChange }) => {
//   const [selectedValues, setSelectedValues] = useState([]);
//   useEffect(() => {
//     onChange(selectedValues);
//   }, [selectedValues, onChange]);

//   console.log(options);

//   const handleChange = e => {
//     const { value } = e.target;
//     setSelectedValues(prev => {
//       if (prev.includes(value)) return prev.filter(i => i !== value);
//       return [...prev, value];
//     });
//   };

//   return (
//     <div>
//       {options &&
//         options.map(i => {
//           console.log(i.checked);
//           return (
//             <div key={i.value}>
//               <input
//                 type="checkbox"
//                 name={i.label}
//                 // onClick={onChange}
//                 onChange={handleChange}
//                 value={i.value}
//               />
//               <div className="form-label">{i.label}</div>
//             </div>
//           );
//         })}
//     </div>
//   );
// };

Checkbox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.any.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      disableSelection: PropTypes.bool
    }),
  ).isRequired,
  multiple: PropTypes.bool,
};

Checkbox.defaultProps = {
  multiple: false,
};

export default Checkbox;
