import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';

import AppContext from '../context/app.context';
import '../styles/Comments.css';

export default function Comments({ teachers }) {
  const { commentsContext: { comments, setComments } } = useContext(AppContext);
  const commentsWrapper = 'comment-wrapper';
  const commentsClass = 'comments';

  return (
    <div className={ (!comments) ? `${commentsWrapper} hide` : commentsWrapper }>
      <div className={ (!comments) ? `${commentsClass} hide` : commentsClass }>
        <button type="button" onClick={ () => setComments() } label="Hide">
          Fechar
        </button>
        { (!comments)
          ? null
          : comments.map((comment, index) => {
            const teacher = (teachers[comment.teacher])
              ? `${teachers[comment.teacher].name}: ${teachers[comment.teacher].email}`
              : 'Docente não encontrado';
            return (
              <div key={ index } className="single-comment">
                { `Comentário: ${comment.msg}` }
                <br />
                <span className="teacher">{ `Docente: ${teacher}` }</span>
              </div>
            );
          }) }
      </div>
    </div>
  );
}

Comments.propTypes = {
  teachers: PropTypes.objectOf(PropTypes.any),
};

Comments.defaultProps = {
  teachers: {},
};
