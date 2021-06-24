import React from 'react';
import { PropTypes } from 'prop-types';

import { TeacherClassCard } from '.';

export default function TeacherSchoolCard({ element }) {
  const { name, address, director } = element;

  return (
    <section>
      <div className="classes-card">
        <p>{ `Escola: ${name}` }</p>
        <span>{ `Diretoria: ${director.name}: ${director.email}` }</span>
        <span>{ `Endereço: ${address}` }</span>
      </div>
      <section>
        { element.classes.map((currClass) => (
          <TeacherClassCard element={ currClass } key={ currClass.id } />
        )) }
      </section>
    </section>
  );
}

TeacherSchoolCard.propTypes = {
  element: PropTypes.objectOf(PropTypes.any).isRequired,
};
