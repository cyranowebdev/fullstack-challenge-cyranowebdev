import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import useStorage from '../hooks/useStorage';
import AppContext from './app.context';

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('login')));
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const updateLogin = useStorage('login');

  const tokenContext = useMemo(() => ({ token, setToken }), [token, setToken]);

  const schoolContext = useMemo(() => (
    { schools, setSchools }), [schools, setSchools]);

  const classesContext = useMemo(() => (
    { classes, setClasses }), [classes, setClasses]);

  useEffect(() => updateLogin(token), [token, updateLogin]);

  return (
    <AppContext.Provider
      value={ { schoolContext, tokenContext, classesContext } }
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

export default AppProvider;
