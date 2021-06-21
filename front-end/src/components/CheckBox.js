import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = (props) => {
  const { callback } = props;

  return (
    <label htmlFor="user-profile" className="inputError">
      <select
        name="user-profile"
        id="user-profile"
        onChange={ (e) => callback(e.target) }
      >
        <option value="">Escolha uma opção</option>
        <option value="admin">Admin</option>
        <option value="diretor">Diretor(a)</option>
        <option value="docente">Docente</option>
      </select>
    </label>
  );
};

CheckBox.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default CheckBox;
