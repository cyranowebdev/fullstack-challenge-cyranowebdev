import React from 'react';
import { PropTypes } from 'prop-types';

export default function DirectorSchool({ school }) {
  const noSchool = 'Você não está vinculado a nenhuma escola.';
  console.log('component: ', school);
  return (
    <section className="schools-container">
      { (Object.keys(school).length < 1)
        ? noSchool
        : (
          <section>
            <span>{ school.name }</span>
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
