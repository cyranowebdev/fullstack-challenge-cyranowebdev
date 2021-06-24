import React, { useContext, useState, useCallback } from 'react';

import AppContext from '../context/app.context';
import api from '../services';
import { TextInput, Button } from '.';

import '../styles/AddComment.css';

export default function AddStudent() {
  const { addStudentContext: { addStudent, setAddStudent },
    tokenContext: { token } } = useContext(AppContext);
  const [name, setName] = useState('');
  const [error, setError] = useState();

  const saveStudent = useCallback(async (value) => {
    const payload = { name: value, classId: addStudent };
    const result = await api.teacher.saveStudent(token, payload);
    if (result.code) {
      setError('Já existe estudante com esse nome. Modifique para adicionar.');
      return;
    }
    setAddStudent();
    window.location.reload();
  }, [addStudent, setAddStudent, setError, token]);

  const wrapperCss = 'comment-wrapper';
  const elementCss = 'comments';

  return (
    <div
      className={ (!addStudent) ? `${wrapperCss} hide` : wrapperCss }
    >
      <div className={ (!addStudent) ? `${elementCss} hide` : elementCss }>
        <button type="button" onClick={ () => setAddStudent() } label="Hide">
          Fechar
        </button>
        <TextInput
          name="name"
          value={ name }
          callback={ (target) => {
            setError();
            setName(target.value);
          } }
        />
        { error }
        <Button
          label="Salvar"
          className="status success"
          callback={ () => saveStudent(name) }
          disabled={ (name.length < 1 || Boolean(error)) }
        />
      </div>
    </div>
  );
}
