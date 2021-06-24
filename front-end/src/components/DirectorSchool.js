import React from 'react';
import { PropTypes } from 'prop-types';

export default function DirectorSchool({ school }) {
  const schoolTypes = {
    0: 'municipal',
    1: 'estadual',
    2: 'federal',
  };

  const noSchool = 'Você não está vinculado a nenhuma escola.';
  return (
    <section className="schools-container">
      { (Object.keys(school).length < 1)
        ? noSchool
        : (
          <section>
            <div className="schools-container">
              <div>
                { school.name }
              </div>
              <div>
                { `tipo de escola: ${schoolTypes[school.type]}` }
              </div>
            </div>
          </section>
        ) }
    </section>
  );
}

DirectorSchool.propTypes = {
  school: PropTypes.objectOf(PropTypes.any),
};

DirectorSchool.defaultProps = {
  school: {},
};
