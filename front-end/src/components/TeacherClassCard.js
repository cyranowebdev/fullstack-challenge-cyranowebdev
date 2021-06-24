import React from 'react';
import { PropTypes } from 'prop-types';

export default function ClassCard({ element }) {
  const { id, grade, year,
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
        Docentes:
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
    </div>
  );
}

ClassCard.propTypes = {
  element: PropTypes.objectOf(PropTypes.any).isRequired,
};
