import React, { useContext, useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

// import AppContext from '../context/app.context';
import { Topbar, Loading } from '../components';
// import api from '../services';

import '../styles/Orders.css';
import OrdersContainer from '../components/OrdersContainer';

export default function Admin() {
  // const { tokenContext: { token } } = useContext(AppContext);

  const title = 'Admin';

  return (
    <section>
      <Topbar title={ title } />
      { (!orders)
        ? <Loading />
        : <OrdersContainer orders={ orders } /> }
    </section>
  );
}
