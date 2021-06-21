import React, { useContext, useEffect } from 'react';

import AppContext from '../context/app.context';
import { Topbar, DirectorSchool } from '../components';
import api from '../services';

import '../styles/Schools.css';

export default function Director() {
  const { directorContext: { directorSchool, setDirectorSchool },
    tokenContext: { token } } = useContext(AppContext);

  useEffect(() => {
    const getSchool = async (payload) => {
      const result = await api.director.fetchSchool(payload);
      setDirectorSchool(result);
    };
    if (!directorSchool) {
      getSchool(token);
    }
  }, [setDirectorSchool, directorSchool, token]);

  const title = 'Diretor';

  return (
    <section>
      <Topbar title={ title } />
      Director home
      <DirectorSchool school={ directorSchool } />
    </section>
  );
}
