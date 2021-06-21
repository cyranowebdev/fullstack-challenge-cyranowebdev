import React, { useContext, useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

import AppContext from '../context/app.context';
import { Topbar, Loading } from '../components';
// import api from '../services';

import '../styles/Schools.css';
import SchoolsList from '../components/SchoolsList';

export default function Admin() {
  const { tokenContext: { token } } = useContext(AppContext);

  const title = 'Admin';

  return (
    <section>
      <Topbar title={ title } />
      <h1>Admin</h1>
      <SchoolsList />
    </section>
  );
}
