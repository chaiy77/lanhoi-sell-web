import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Select = forwardRef(
  (
    { options, onChange, name, register, defaultValue, defaultText, disabled },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const handleChange = e => {
      e.preventDefault();
      setSelectedValue(e.target.value);
      onChange(e);
    };

    return (
      <div className="relative">
        <select
          className="block appearance-none w-full bg-white border border-gray-400
          text-gray-700 py-1 px-4 pr-8 rounded leading-tight 
          focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={e => handleChange(e)}
          name={name}
          ref={register}
          value={selectedValue}
          disabled={disabled}
        >
          <option value="">{defaultText}</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt} label={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 
      flex items-center px-2 text-gray-700"
        >
          <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    );
  }
);

Select.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  name: PropTypes.string,
  register: PropTypes.func,
  defaultText: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
};
Select.defaultProps = {
  defaultText: 'select product',
  defaultValue: '',
  options: [1, 2, 3],
  onChange: () => {},
  name: 'defaultName',
  register: () => {},
  disabled: false,
};

export default Select;
