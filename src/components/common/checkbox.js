import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Checkbox = forwardRef(({ label, name, register, onCheck }, ref) => {
  const css = `
  input:checked + svg {
    display: block !important;
  }`;
  const handleClick = e => {
    console.log(e.target.checked);
    onCheck(e.target.checked);
  };

  return (
    <div>
      <style>{css}</style>
      <label className="flex justify-start items-start">
        <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
          <input
            type="checkbox"
            className="opacity-0 absolute"
            name={name}
            ref={register}
            onClick={e => handleClick(e)}
          />
          <svg
            className="fill-current hidden w-4 h-4 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        </div>
        <div className="select-none">{label}</div>
      </label>
    </div>
  );
});
Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onCheck: PropTypes.func,
  register: PropTypes.func,
};
Checkbox.defaultProps = {
  label: '',
  onCheck: () => {},
  register: () => {},
};

export default Checkbox;
