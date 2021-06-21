import React, { useContext, useEffect } from 'react';

import AppContext from '../context/app.context';
import api from '../services';
import SchoolCard from './SchoolCard';

export default function SchoolsList() {
  const {
    schoolContext: { schools, setSchools },
    tokenContext: { token } } = useContext(AppContext);

  useEffect(() => {
    const getSchools = async (payload) => {
      const results = await api.admin.fetchSchools(payload);
      console.log('admin page: ', results);
      setSchools(results);
    };
    if (schools.length < 1) {
      getSchools(token);
    }
  }, [schools, setSchools, token]);

  const noSchools = (token.profile === 'admin')
    ? 'Não há escolas no banco de dados.'
    : 'Você não está vinculado a nenhuma escola.';

  return (
    <section className="schools-container">
      { (schools.length < 1)
        ? <h4>{ noSchools }</h4>
        : schools.map((school, index) => (
          <SchoolCard school={ school } index={ index } key={ school.id } />)) }
    </section>
  );
}
