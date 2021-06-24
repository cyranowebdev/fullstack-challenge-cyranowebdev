import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';

import AppContext from '../context/app.context';
import { Button } from '.';

export default function ClassCard({ element }) {
  const { commentsContext: { setComments } } = useContext(AppContext);
  const { id, grade, year, class: name, teachers } = element;
  const currComments = (element.comments) ? element.comments : [];
  const students = (element.students) ? element.students : [];

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
        { currComments.length }
        <Button
          label="Ver"
          className="status warning"
          callback={ () => setComments(currComments) }
          disabled={ (currComments.length < 1) }
        />
        <Button
          label="Adicionar"
          className="status success"
          callback={ () => {} }
        />
        <br />
        Estudantes:
        { students.length }
        <Button
          label="Ver"
          className="status warning"
          callback={ () => {} }
          disabled={ (students.length < 1) }
        />
        <Button
          label="Adicionar"
          className="status success"
          callback={ () => {} }
        />
      </div>
    </div>
  );
}

ClassCard.propTypes = {
  element: PropTypes.objectOf(PropTypes.any).isRequired,
};
