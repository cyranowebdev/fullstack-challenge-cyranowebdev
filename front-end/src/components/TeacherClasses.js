/* eslint-disable no-underscore-dangle */
import React from 'react';
import { PropTypes } from 'prop-types';

import TeacherSchoolCard from './TeacherSchoolCard';
import '../styles/Classes.css';

export default function TeacherClasses({ classes }) {
  const schools = (classes.length < 1)
    ? null
    : classes.reduce((schoolsObj, curr) => (
      { ...schoolsObj,
        [curr.school.id]: {
          ...curr.school,
          director: curr.director,
          classes: classes.filter((elem) => (
            elem.school.id === curr.school.id)),
        } }
    ), {});

  if (!classes) return 'Carregando classes...';
  return (
    <section className="schools-container">
      { (!schools)
        ? 'Ainda não há classes vinculadas ao seu usuário.'
        : Object.keys(schools).map((currSchool) => (
          <TeacherSchoolCard
            element={ schools[currSchool] }
            key={ schools[currSchool].id }
          />
        )) }
    </section>
  );
}

TeacherClasses.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.any),
};

TeacherClasses.defaultProps = {
  classes: [],
};
