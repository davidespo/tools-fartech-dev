import React, { useState } from 'react';
import routes from '../routes';

import { withAuthUser } from '../hoc/auth';
import { branch, compose, renderComponent } from 'recompose';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarText,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link as RouterLink } from 'react-router-dom';
import MyNavLink from './MyNavLink';

const AnonNavbar = ({ login }) => (
  <Nav navbar style={{ marginRight: '2em' }}>
    <NavItem>
      <button className="btn btn-danger" onClick={login}>
        Login <i className="fa fa-google"></i>
      </button>
    </NavItem>
  </Nav>
);

let AuthNavbar = ({ authUser, logout }) => (
  <Nav navbar style={{ marginRight: '2em' }}>
    <NavbarText>
      <RouterLink to="/me">
        <img
          src={authUser.picture}
          className="rounded-circle"
          alt={authUser.name}
          style={{ width: '30px', cursor: 'pointer' }}
        />
      </RouterLink>
      <button className="btn btn-link text-secondary" onClick={logout}>
        Logout
      </button>
    </NavbarText>
  </Nav>
);

AuthNavbar = compose(
  withAuthUser,
  branch(({ isAnon }) => isAnon, renderComponent(AnonNavbar)),
)(AuthNavbar);

const Header = ({ isAnon }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar dark className="bg-dark">
        <RouterLink to="/" className="navbar-brand mr-auto mono">
          <span className="text-warning">tools</span>@F&amp;RTech.dev
        </RouterLink>
        <AuthNavbar />
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {routes.map(({ url, title }) => (
              <MyNavLink href={url} key={url}>
                {title}
              </MyNavLink>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default withAuthUser(Header);
