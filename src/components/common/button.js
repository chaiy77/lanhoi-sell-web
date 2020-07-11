import React from 'react';
import PropTypes, { func } from 'prop-types';

const Button = ({ label, onClick }) => {
  return (
    <button
      className="w-full bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
};
Button.propsType = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  label: 'Button',
  onClick: () => {},
};

export default Button;
