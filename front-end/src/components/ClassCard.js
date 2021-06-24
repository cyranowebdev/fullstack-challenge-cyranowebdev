import React from 'react';
import { PropTypes } from 'prop-types';

import Button from './Button';

export default function ClassCard({ element, remove }) {
  const { id, schoolId, grade, year,
    class: name, teachers, comments } = element;

  return (
    <div
      className="classes-card"
      key={ id }
    >
      <div>
        { `Ano: ${grade} / ${year}` }
      </div>
      <div>
        { `Turma: ${name}` }
      </div>
      <div>
        Professores:
        <br />
        { (teachers.length < 1)
          ? (
            <span className="teacher">
              Sem professores.
            </span>
          )
          : teachers.map((teacher) => (
            <span key={ teacher.name } className="teacher">
              { `${teacher.name} - ${teacher.email}` }
            </span>
          )) }
        <br />
        Observações:
        { (comments)
          ? ` ${comments.length}`
          : ' 0' }
      </div>
      <Button
        label="Remover classe"
        className="status alert"
        callback={ () => remove(id, schoolId) }
      />
    </div>
  );
}

ClassCard.propTypes = {
  element: PropTypes.objectOf(PropTypes.any).isRequired,
  remove: PropTypes.func,
};

ClassCard.defaultProps = {
  remove: () => {},
};
