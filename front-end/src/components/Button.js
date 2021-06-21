import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ disabled, label, callback, className }) => (
  <button
    type="button"
    onClick={ callback }
    disabled={ disabled }
    className={ className }
  >
    <span>
      { label }
    </span>
  </button>
);

export default Button;

Button.propTypes = {
  callback: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

Button.defaultProps = {
  callback: () => {},
  className: '',
  disabled: false,
  label: 'BOTAO',
};
