import React, { useContext, useState, useCallback } from 'react';

import AppContext from '../context/app.context';
import api from '../services';
import { TextInput, Button } from '.';

import '../styles/AddComment.css';

export default function AddComment() {
  const { targetCommentContext: { targetComment, setTargetComment },
    tokenContext: { token } } = useContext(AppContext);
  const [msg, setMsg] = useState('');

  const saveComment = useCallback(async () => {
    const payload = { msg };
    payload.classId = (targetComment.name) ? targetComment.classId : targetComment;
    if (targetComment.name) payload.name = targetComment.name;
    await api.teacher.saveComment(token, payload);
    setTargetComment();
    window.location.reload();
  }, [targetComment, msg, setTargetComment, token]);

  const commentsWrapper = 'comment-wrapper';
  const commentsClass = 'comments';

  return (
    <div className={ (!targetComment) ? `${commentsWrapper} hide` : commentsWrapper }>
      <div className={ (!targetComment) ? `${commentsClass} hide` : commentsClass }>
        <button type="button" onClick={ () => setTargetComment() } label="Hide">
          Fechar
        </button>
        <TextInput
          name="comment"
          value={ msg }
          callback={ (target) => setMsg(target.value) }
        />
        <Button
          label="Salvar"
          className="status success"
          callback={ saveComment }
          disabled={ (msg.length < 1) }
        />
      </div>
    </div>
  );
}
