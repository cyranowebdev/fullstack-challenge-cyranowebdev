import React, { useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

import AppContext from '../context/app.context';
import { Topbar } from '../components';
import api from '../services';

import '../styles/Schools.css';

export default function Teacher() {
  const {
    classesContext: { classes, setClasses },
    tokenContext: { token } } = useContext(AppContext);

  useEffect(() => {
    const getSchoolsAndClasses = async (payload) => {
      const results = await api.teacher.fetchClasses(payload);
      if (Array.isArray(results)) setClasses(results);
    };
    if (!classes) {
      getSchoolsAndClasses(token);
    }
  }, [classes, setClasses, token]);

  const title = 'Docente';

  return (
    <section>
      <Topbar title={ title } />
      {`Bem vinda(o), ${token.name}!`}
    </section>
  );
}
