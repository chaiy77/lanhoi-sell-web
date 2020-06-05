import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ text }) => {
  const handleChange = e => {
    e.preventDefault();
    console.log(e.target.value);
  };
  return (
    <div>
      <input
        className="appearance-none block w-full bg-gray-100 
              text-gray-700 border border-gray-200 rounded py-1 px-2
              leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-last-name"
        type="text"
        placeholder={text}
        onChange={e => handleChange(e)}
      />
    </div>
  );
};

TextInput.propTypes = {
  text: PropTypes.string,
};
TextInput.defaultProps = {
  text: 'insert',
};

export default TextInput;
