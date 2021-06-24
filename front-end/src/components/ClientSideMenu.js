import React from 'react';
// import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export default function ClientMenu({ className, callback }) {
  return (
    <section className={ className }>
      Client menu
    </section>
  );
}

ClientMenu.propTypes = {
  callback: PropTypes.func,
  className: PropTypes.string.isRequired,
};

ClientMenu.defaultProps = {
  callback: () => {},
};
