import React from 'react';
import PropTypes from 'prop-types';

const TextInput = (props) => {
  const { name, value, callback, readonly = 'false' } = props;

  let type;
  let label;

  switch (name) {
  case 'name':
    type = 'text';
    label = 'Nome';
    break;
  case 'email':
    type = 'email';
    label = 'Email';
    break;
  case 'password':
    type = 'password';
    label = 'Senha';
    break;
  case 'street':
    type = 'text';
    label = 'Rua';
    break;
  case 'house-number':
    type = 'number';
    label = 'Número';
    break;
  default: break;
  }

  const inputProps = {
    type,
    id: name,
    name,
    value,
  };

  if (type === 'number') inputProps.min = 0;

  return (
    <label htmlFor={ name } className="inputError">
      { label }
      <input
        { ...inputProps }
        onChange={ (e) => callback(e.target) }
        readOnly={ readonly }
      />
    </label>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  callback: PropTypes.func,
  readonly: PropTypes.bool,
};

TextInput.defaultProps = {
  callback: () => {},
  value: '',
  readonly: false,
};

export default TextInput;
