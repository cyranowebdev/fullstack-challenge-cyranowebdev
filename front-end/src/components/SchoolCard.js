import React from 'react';
import { PropTypes } from 'prop-types';

import Button from './Button';

export default function SchoolCard({ school, remove, index }) {
  const { id, name, address, type, director, status } = school;

  const schoolTypes = {
    0: 'Municipal',
    1: 'Estadual',
    2: 'Federal',
  };

  let statusCss = 'status success';
  if (!status) statusCss = 'status warning';

  // const getSchoolDetails = () => {
  //   if (token.profile === 'admin') return history.push(`/admin/orders/${id}`);
  //   history.push(`/orders/${id}`);
  // };

  return (
    <section
      className="school-card"
      // role="link"
      // onClick={ getSchoolDetails }
      // onKeyDown={ getSchoolDetails }
      tabIndex={ index }
      key={ `${index}-${id}` }
    >
      <section className="name">{ name }</section>
      <section className="director">{ director }</section>
      <span className="address">{ address }</span>
      <span className="type">{ schoolTypes[type] }</span>
      <span className={ statusCss }>
        {(status) ? 'Ativa' : 'Sem diretor'}
      </span>
      <Button
        label="Remover escola"
        className="status alert"
        callback={ remove }
      />
    </section>
  );
}

SchoolCard.propTypes = {
  school: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  remove: PropTypes.func,
};

SchoolCard.defaultProps = {
  remove: () => {},
};
