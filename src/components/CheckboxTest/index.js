import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss'

class CheckboxTest extends React.PureComponent {
  state = {
    selectedValues: [],
  };

  componentDidMount(){
    console.log('checkbox', this.props);
    const {defaultValue} = this.props;
    if (defaultValue) this.setState({
      selectedValues:[...defaultValue]
    })
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { onChange, multiple } = this.props;
    const { selectedValues: prevSelectedValues } = prevState;
    const { selectedValues: currentSelectedValues } = this.state;
    if (prevSelectedValues !== currentSelectedValues && onChange)
      onChange(multiple ? currentSelectedValues : currentSelectedValues[0]);
  }


  handleChange = e => {
    const { multiple } = this.props;
    const { value } = e.currentTarget.dataset;
    if (multiple)
      this.setState(prev => {
        if (prev.selectedValues.includes(value))
          return { ...prev, selectedValues: prev.selectedValues.filter(i => i !== value) };
        return { ...prev, selectedValues: [...prev.selectedValues, value] };
      });
    else
      this.setState(prev => {
        if (value === prev.selectedValues[0]) return { selectedValues: [] };
        return { selectedValues: [value] };
      });
  };

  render() {
    const { options } = this.props;
    const { selectedValues } = this.state;
    return options.map(i => {
      const isChecked = selectedValues.map(m => String(m)).includes(String(i.value));
      return (
        <div key={i.value} className={styles.checkboxWrapper}>
          <div
            role="button"
            className={styles.checkboxButton}
            onClick={this.handleChange}
            onKeyDown={this.handleChange}
            data-value={i.value}
            tabIndex={-1}
          >
            {isChecked && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="addressBlocks-base-radioIcon"
              >
                <g fillRule="evenodd">
                  <path d="M8 14.933A6.941 6.941 0 0 1 1.067 8 6.941 6.941 0 0 1 8 1.067 6.941 6.941 0 0 1 14.933 8 6.941 6.941 0 0 1 8 14.933M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8" />
                  <path d="M8 3.429a4.571 4.571 0 1 0 0 9.143 4.571 4.571 0 0 0 0-9.143" />
                </g>
              </svg>
            )}
            {!isChecked && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="addressBlocks-base-radioIcon"
              >
                <path
                  fillRule="evenodd"
                  d="M8 14.933A6.941 6.941 0 0 1 1.067 8 6.941 6.941 0 0 1 8 1.067 6.941 6.941 0 0 1 14.933 8 6.941 6.941 0 0 1 8 14.933M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8"
                />
              </svg>
            )}
          </div>
          {/* <div className="form-label">{i.label}</div> */}
          <label htmlFor={i.value} className={`form-label ${styles.checkboxLabel}`}>
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
//                 type="CheckboxTest"
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

CheckboxTest.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.any.isRequired,
      // value: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
      value: PropTypes.any.isRequired,
    }),
  ).isRequired,
  multiple: PropTypes.bool,
};

CheckboxTest.defaultProps = {
  multiple: false,
};

export default CheckboxTest;
