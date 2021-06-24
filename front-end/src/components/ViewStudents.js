import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';

import AppContext from '../context/app.context';
import '../styles/Comments.css';

export default function ViewStudents({ teachers }) {
  const { studentsContext: { students, setStudents } } = useContext(AppContext);
  const commentsWrapper = 'comment-wrapper';
  const commentsClass = 'comments';

  return (
    <div className={ (!students) ? `${commentsWrapper} hide` : commentsWrapper }>
      <div className={ (!students) ? `${commentsClass} hide` : commentsClass }>
        <button type="button" onClick={ () => setStudents() } label="Hide">
          Fechar
        </button>
        { (!students)
          ? null
          : students.map((student, index) => (
            <div key={ index } className="single-comment">
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
