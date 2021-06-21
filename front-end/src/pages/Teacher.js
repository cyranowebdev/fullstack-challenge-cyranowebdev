import React, { useContext, useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

// import AppContext from '../context/app.context';
import { Topbar } from '../components';
// import api from '../services';

import '../styles/Schools.css';

export default function Teacher() {
  const title = 'Docente';

  return (
    <section>
      <Topbar title={ title } />
      Director home
    </section>
  );
}
