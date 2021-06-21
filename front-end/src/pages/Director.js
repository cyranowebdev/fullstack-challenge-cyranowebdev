import React, { useContext, useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

// import AppContext from '../context/app.context';
import { Topbar } from '../components';
// import api from '../services';

import '../styles/Orders.css';

export default function Director() {
  const title = 'Diretor';

  return (
    <section>
      <Topbar title={ title } />
      Director home
    </section>
  );
}
