import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import AppContext from '../context/app.context';

export default function SchoolCard({ school, index }) {
  const { tokenContext: { token } } = useContext(AppContext);
  const { id, name, address, type, director, status } = school;

  const history = useHistory();

  let statusCss = 'status success';
  if (status === 'Pendente') statusCss = 'status alert';
  if (status === 'Preparando') statusCss = 'status warning';

  const getOrderDetails = () => {
    if (token.role === 'admin') return history.push(`/admin/orders/${id}`);
    history.push(`/orders/${id}`);
  };

  return (
    <section
      className="school-card"
      role="link"
      onClick={ getOrderDetails }
      onKeyDown={ getOrderDetails }
      tabIndex={ index }
      key={ `${index}-${id}` }
    >
      <section className="name">{ name }</section>
      <span className="address">{ address }</span>
      <span className={ statusCss }>
        {(status) ? 'Ativa' : 'Sem diretor'}
      </span>
    </section>
  );
}

SchoolCard.propTypes = {
  school: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
