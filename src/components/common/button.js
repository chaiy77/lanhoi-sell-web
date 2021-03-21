<<<<<<< HEAD
import React from 'react';
import PropTypes, { func } from 'prop-types';

const Button = ({ label, onClick, color }) => {
  const _style = 'w-full  text-white font-bold py-2 px-4 rounded ' + color;
  return (
    <button className={_style} onClick={() => onClick()}>
      {label}
    </button>
  );
};
Button.propsType = {
  label: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  label: 'Button',
  color: 'bg-green-400 hover:bg-green-500',
  onClick: () => {},
};

export default Button;
=======
import React from 'react';
import PropTypes, { func } from 'prop-types';

const Button = ({ label, onClick, color }) => {
  const _style = 'w-full  text-white font-bold py-2 px-4 rounded ' + color;
  return (
    <button className={_style} onClick={() => onClick()}>
      {label}
    </button>
  );
};
Button.propsType = {
  label: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  label: 'Button',
  color: 'bg-green-400 hover:bg-green-500',
  onClick: () => {},
};

export default Button;
>>>>>>> b23ac42965c58d56aa202044243f3a891b98e3cd
