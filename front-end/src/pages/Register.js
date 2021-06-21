import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AppContext from '../context/app.context';
import { TextInput, CheckBox, SubmitButton } from '../components';
import { yupSchemas, handleSubmit } from '../utils';

import '../styles/Forms.css';

export default function Register() {
  const { tokenContext: { setToken } } = useContext(AppContext);
  const history = useHistory();
  const [login, setLogin] = useState({ name: '', email: '', password: '', profile: '' });
  const [disableBtn, setDisableBtn] = useState(true);

  const updateLogin = (target) => {
    if (target.type === 'select-one') {
      setLogin({ ...login, profile: target.value });
    } else {
      setLogin({ ...login, [target.name]: target.value });
    }
  };

  const submit = (e) => {
    e.preventDefault();

    const params = { action: 'register', login, setToken, history };
    handleSubmit(params);
  };

  useEffect(() => {
    const validateForm = async () => yupSchemas.register.validate(login)
      .then((valid) => (valid.email) && setDisableBtn(false))
      .catch((error) => {
        if (disableBtn === false) setDisableBtn(true);
        return error;
      });

    validateForm();
  }, [login, disableBtn]);

  return (
    <div>
      <form onSubmit={ submit }>
        <fieldset>
          <legend>Registro</legend>
          <TextInput
            name="name"
            value={ login.name }
            callback={ updateLogin }
          />
          <TextInput
            name="email"
            value={ login.email }
            callback={ updateLogin }
          />
          <TextInput
            name="password"
            value={ login.password }
            callback={ updateLogin }
          />
          <CheckBox callback={ updateLogin } />
          <SubmitButton type="signup" disabled={ disableBtn } />
        </fieldset>
      </form>
    </div>
  );
}
