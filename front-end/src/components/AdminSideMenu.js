import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export default function AdminMenu({ className, callback }) {
  return (
    <section className={ className }>
      Admin menu
    </section>
  );
}

AdminMenu.propTypes = {
  callback: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
