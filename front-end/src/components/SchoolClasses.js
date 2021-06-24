import React, { useContext, useCallback } from 'react';
import { PropTypes } from 'prop-types';

import AppContext from '../context/app.context';
import api from '../services';
import ClassCard from './ClassCard';
import '../styles/Classes.css';

export default function SchoolClasses({ classes }) {
  const {
    classesContext: { setClasses },
    tokenContext: { token } } = useContext(AppContext);

  const removeClass = useCallback(async (classId, schoolId) => {
    try {
      await api.director.removeClass(token, classId);
      const refreshClasses = await api.director.fetchClasses(token, schoolId);
      if (!Array.isArray(refreshClasses)) throw new Error(refreshClasses);
      setClasses(refreshClasses);
    } catch (err) {
      console.log('Error: ', err);
    }
  }, [token, setClasses]);

  if (!classes) return 'Carregando classes...';
  return (
    <section className="schools-container">
      { (Object.keys(classes).length < 1)
        ? 'Ainda não há classes cadastradas para essa escola.'
        : classes.map((currClass) => (
          <ClassCard
            element={ currClass }
            remove={ removeClass }
            key={ currClass.id }
          />
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
