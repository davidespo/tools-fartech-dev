import React from 'react';

import { Nav } from 'reactstrap';
import MyNavLink from './MyNavLink';

const NavSidebar = ({ routes = [] }) => (
  <div className="NavSidebar">
    <Nav vertical>
      {routes.map(({ title, url }) => (
        <MyNavLink href={url} key={url}>
          {title}
        </MyNavLink>
      ))}
    </Nav>
  </div>
);

export default NavSidebar;
