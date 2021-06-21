import React, { useContext, useEffect, useCallback } from 'react';

import AppContext from '../context/app.context';
import api from '../services';
import SchoolCard from './SchoolCard';

export default function SchoolsList() {
  const {
    schoolContext: { schools, setSchools },
    tokenContext: { token } } = useContext(AppContext);

  const removeSchool = useCallback(async (schoolId) => {
    await api.admin.removeSchool(token, schoolId);
    const refreshSchools = await api.admin.fetchSchools(token);
    setSchools(refreshSchools);
  }, [token, setSchools]);

  useEffect(() => {
    const getSchools = async (payload) => {
      const results = await api.admin.fetchSchools(payload);
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
          <SchoolCard
            school={ school }
            remove={ removeSchool }
            index={ index }
            key={ school.id }
          />)) }
    </section>
  );
}
