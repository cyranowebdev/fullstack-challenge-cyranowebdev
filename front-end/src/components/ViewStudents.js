import React, { useContext, useCallback } from 'react';
import { PropTypes } from 'prop-types';

import AppContext from '../context/app.context';
import api from '../services';

import { Button } from '.';

import '../styles/Students.css';

export default function ViewStudents({ teachers }) {
  const { studentsContext: { students, setStudents },
    classIdContext: { classId },
    tokenContext: { token } } = useContext(AppContext);
  const wrapperCss = 'student-wrapper';
  const elementCss = 'students';

  const deleteStudent = useCallback(async (name) => {
    const payload = {
      name,
      classId,
    };
    await api.teacher.removeStudent(token, payload);
    const updateStudents = students.filter((student) => student.name !== name);
    setStudents(updateStudents);
  }, [classId, students, setStudents, token]);

  return (
    <div className={ (!students) ? `${wrapperCss} hide` : wrapperCss }>
      <div className={ (!students) ? `${elementCss} hide` : elementCss }>
        <button
          type="button"
          onClick={ () => {
            setStudents();
            window.location.reload();
          } }
          label="Hide"
        >
          Fechar
        </button>
        { (!students)
          ? null
          : students.map((student, index) => (
            <div key={ index } className="single-student">
              <Button
                label="X"
                className="status alert remove"
                callback={ () => deleteStudent(student.name) }
              />
              <div>
                { student.name }
                { (!student.comments)
                  ? null
                  : student.comments.map((comment, i) => {
                    const teacher = (teachers[comment.teacher])
                      ? `${teachers[comment.teacher].name}
                        (${teachers[comment.teacher].email})`
                      : 'Docente não encontrado';
                    return (
                      <span className="teacher" key={ i }>
                        { `${teacher}: ${comment.msg}` }
                      </span>
                    );
                  }) }
              </div>
            </div>
          )) }
      </div>
    </div>
  );
}

ViewStudents.propTypes = {
  teachers: PropTypes.objectOf(PropTypes.any),
};

ViewStudents.defaultProps = {
  teachers: {},
};
