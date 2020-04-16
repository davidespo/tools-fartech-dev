import React from 'react';

import { NavItem } from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';

const MyNavLink = ({ href, children, disabled }) => (
  <NavItem>
    <RouterNavLink
      to={href}
      className={`nav-link ${disabled ? 'disabled' : ''}`}
    >
      {children}
    </RouterNavLink>
  </NavItem>
);

export default MyNavLink;
