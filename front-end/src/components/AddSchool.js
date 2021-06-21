import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { yupSchemas } from '../utils';
import TextInput from './TextInput';

export default function AddSchool({ submit, className, value, handler, directors }) {
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const validateForm = async () => yupSchemas.newSchool.validate(value)
      .then(() => {
        if (disable) setDisable(false);
      })
      .catch((error) => {
        if (!disable) setDisable(true);
        return error;
      });

    validateForm();
  }, [disable, value]);

  return (
    <form onSubmit={ (e) => submit(e, value) } className={ className }>
      <fieldset>
        <legend>
          Adicionar escola
        </legend>
        <TextInput
          name="name"
          value={ value.name }
          callback={ handler }
        />
        <TextInput
          name="address"
          value={ value.address }
          callback={ handler }
        />
        <select name="type" onChange={ handler }>
          <option value="">Escolha uma opção</option>
          <option value="0">Municipal</option>
          <option value="1">Estadual</option>
          <option value="2">Federal</option>
        </select>
        <select name="director" onChange={ handler }>
          { (directors.length < 1)
            ? <option>Carregando diretores...</option>
            : (directors.map((director) => (
              <option value={ director.email } key={ director.id }>
                { `${director.name}: ${director.email}` }
              </option>
            ))
            ) }
        </select>
        <button id="submit" type="submit" disabled={ disable }>
          Salvar
        </button>
      </fieldset>
    </form>
  );
}

AddSchool.propTypes = {
  handler: PropTypes.func,
  className: PropTypes.string,
  submit: PropTypes.func,
  value: PropTypes.objectOf(PropTypes.any),
  directors: PropTypes.arrayOf(PropTypes.any),
};

AddSchool.defaultProps = {
  handler: () => {},
  className: '',
  submit: () => {},
  value: () => {},
  directors: [],
};
