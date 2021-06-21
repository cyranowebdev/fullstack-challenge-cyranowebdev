import React, { useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import AppContext from '../context/app.context';
import api from '../services';
import { Button } from '.';

export default function SchoolCard({ school, index }) {
  const {
    schoolContext: { setSchools },
    tokenContext: { token } } = useContext(AppContext);
  const { id, name, address, type, director, status } = school;

  const history = useHistory();

  const schoolTypes = {
    0: 'Municipal',
    1: 'Estadual',
    2: 'Federal',
  };

  const removeSchool = useCallback(async () => {
    await api.admin.removeSchool(token, id);
    const refreshSchools = await api.admin.fetchSchools(token);
    setSchools(refreshSchools);
  }, [id, token, setSchools]);

  let statusCss = 'status success';
  if (!status) statusCss = 'status warning';

  const getSchoolDetails = () => {
    if (token.profile === 'admin') return history.push(`/admin/orders/${id}`);
    history.push(`/orders/${id}`);
  };

  return (
    <section
      className="school-card"
      // role="link"
      // onClick={ getSchoolDetails }
      // onKeyDown={ getSchoolDetails }
      tabIndex={ index }
      key={ `${index}-${id}` }
    >
      <section className="name">{ name }</section>
      <section className="director">{ director }</section>
      <span className="address">{ address }</span>
      <span className="type">{ schoolTypes[type] }</span>
      <span className={ statusCss }>
        {(status) ? 'Ativa' : 'Sem diretor'}
      </span>
      <Button
        label="Deletar"
        className="status alert"
        callback={ removeSchool }
      />
    </section>
  );
}

SchoolCard.propTypes = {
  school: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
