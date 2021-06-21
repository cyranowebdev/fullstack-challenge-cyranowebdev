import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import useStorage from '../hooks/useStorage';
import AppContext from './app.context';

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('login')));
  const [schools, setSchools] = useState([]);
  const [directorSchool, setDirectorSchool] = useState();
  const [classes, setClasses] = useState([]);
  const updateLogin = useStorage('login');

  const tokenContext = useMemo(() => ({ token, setToken }), [token, setToken]);

  const schoolContext = useMemo(() => (
    { schools, setSchools }), [schools, setSchools]);

  const directorContext = useMemo(() => (
    { directorSchool, setDirectorSchool }), [directorSchool, setDirectorSchool]);

  const classesContext = useMemo(() => (
    { classes, setClasses }), [classes, setClasses]);

  useEffect(() => updateLogin(token), [token, updateLogin]);

  return (
    <AppContext.Provider
      value={ {
        schoolContext,
        directorContext,
        classesContext,
        tokenContext,
      } }
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

export default AppProvider;
