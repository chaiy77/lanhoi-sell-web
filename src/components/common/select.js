import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Select = forwardRef(({ options, onChange, name, register }, ref) => {
  // const handleChange = e => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  // };
  return (
    <div className="relative">
      <select
        className="block appearance-none w-full bg-white border border-gray-400 
        text-gray-700 py-1 px-4 pr-8 rounded leading-tight 
        focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-state"
        onChange={e => onChange(e)}
        name={name}
        ref={register()}
      >
        <option value="">select product</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
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
});

Select.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  name: PropTypes.string,
  register: PropTypes.func,
};
Select.defaultProps = {
  options: [1, 2, 3],
  onChange: () => {},
  name: 'defaultName',
  register: () => {},
};

export default Select;
