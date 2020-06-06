import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const TextInput = forwardRef(({ text, name, register, onChange }, ref) => {
  // const handleChange = e => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  // };
  return (
    <div>
      <input
        className="appearance-none block w-full bg-gray-100 
              text-gray-700 border border-gray-200 rounded py-1 px-2
              leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-last-name"
        type="text"
        placeholder={text}
        onChange={e => onChange(e)}
        name={name}
        ref={register}
      />
    </div>
  );
});

TextInput.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
  onChange: PropTypes.func,
};
TextInput.defaultProps = {
  text: 'insert',
  name: 'defaultName',
  register: () => {},
  onChange: () => {},
};

export default TextInput;
