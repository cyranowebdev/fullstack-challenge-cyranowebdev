import React from 'react';
// import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export default function ClientMenu({ className, callback }) {
  return (
    <section className={ className }>
      <button
        type="button"
        onClick={ callback }
        data-testid="side-menu-item-logout"
        className="sidebar-logout-btn"
      >
        Sair do sistema
      </button>
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
