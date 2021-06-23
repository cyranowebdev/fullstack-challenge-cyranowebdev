import React from 'react';
import { PropTypes } from 'prop-types';

import '../styles/Classes.css';

export default function SchoolClasses({ classes }) {
  if (!classes) return 'Carregando classes...';
  return (
    <section className="schools-container">
      { (Object.keys(classes).length < 1)
        ? 'Ainda não há classes cadastradas para essa escola.'
        : classes.map((currClass) => (
          <div className="classes-card" key={ currClass.id }>
            <div>
              { `Ano: ${currClass.grade} / ${currClass.year}` }
            </div>
            <div>
              { `Turma: ${currClass.class}` }
            </div>
            <div>
              Professores:
              <br />
              { currClass.teachers.map((teacher) => (
                <span key={ teacher.name } className="teacher">
                  { `${teacher.name} > ${teacher.email}` }
                </span>
              )) }
              <br />
              Observações:
              { (currClass.comments)
                ? ` ${currClass.comments.length}`
                : ' 0' }
            </div>
          </div>
        )) }
    </section>
  );
}

SchoolClasses.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.any),
};

SchoolClasses.defaultProps = {
  classes: [],
};
