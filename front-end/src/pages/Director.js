import React, { useContext, useEffect } from 'react';

import AppContext from '../context/app.context';
import { Topbar, DirectorSchool, SchoolClasses } from '../components';
import api from '../services';

import '../styles/Schools.css';

export default function Director() {
  const {
    directorContext: { directorSchool, setDirectorSchool },
    classesContext: { classes, setClasses },
    tokenContext: { token } } = useContext(AppContext);

  useEffect(() => {
    const getSchool = async (payload) => {
      const school = await api.director.fetchSchool(payload);
      setDirectorSchool(school);
      const getClasses = await api.director.fetchClasses(payload, school.id);
      if (Array.isArray(getClasses)) setClasses(getClasses);
    };
    if (!directorSchool) {
      getSchool(token);
    }
  }, [setDirectorSchool, directorSchool, setClasses, token]);

  const title = 'Diretor';

  return (
    <section>
      <Topbar title={ title } />
      <h2>
        Bem vinda(o),
        { ` ${token.name}!` }
      </h2>
      <DirectorSchool school={ directorSchool } />
      <SchoolClasses classes={ (classes) } />
    </section>
  );
}
