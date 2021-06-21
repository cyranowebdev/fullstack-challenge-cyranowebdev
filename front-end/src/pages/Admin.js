import React, { useContext, useState, useEffect, useCallback } from 'react';
import AppContext from '../context/app.context';
import { Topbar, AddSchool, SchoolsList } from '../components';
import api from '../services';

import '../styles/Schools.css';

export default function Admin() {
  const { tokenContext: { token } } = useContext(AppContext);
  const [newSchool, setNewSchool] = useState({});
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    const getDirectors = async (payload) => {
      const results = await api.admin.getDirectors(payload);
      setDirectors(results);
    };

    if (directors.length < 1) {
      getDirectors(token);
    }
  }, [directors.length, token]);

  const handler = useCallback((event) => {
    const isSelect = (event.target && event.target.type
    && event.target.type === 'select-one');
    if (isSelect) {
      setNewSchool({
        ...newSchool,
        [event.target.name]: event.target.value });
      return;
    }
    setNewSchool({ ...newSchool, [event.name]: event.value });
  }, [newSchool]);

  const submitNewSchool = useCallback(async (e, payload) => {
    e.preventDefault();
    const sendSchool = { ...payload };
    if (sendSchool.director === '1') delete sendSchool.director;
    await api.admin.saveSchool(token, payload);
  }, [token]);

  const title = 'Admin';

  return (
    <section>
      <Topbar title={ title } />
      <h1>Admin</h1>
      <AddSchool
        value={ newSchool }
        className=""
        handler={ handler }
        directors={ directors }
        submit={ submitNewSchool }
      />
      <SchoolsList />
    </section>
  );
}
