import React from 'react';
import PropTypes, { func } from 'prop-types';

const Button = ({ label, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
