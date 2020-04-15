import React from 'react';

import { branch, compose, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export const withAuthUser = connect(
  ({ authUser }) => {
    return {
      authUser,
      isAnon: !authUser,
    };
  },
  (dispatch) => ({
    login: () => dispatch.authUser.login(),
    logout: () => dispatch.authUser.logout(),
  }),
);

const DefaultUnauthorizedComponent = () => (
  <div className="text-center">
    <h1>Unauthorized</h1>
    <p className="lead">Please login above.</p>
  </div>
);

export const withAuthFilter = (options = {}) => {
  let { UnauthorizedComponent, destinationPath } = options;
  const AnonComponent = (props) => {
    if (!UnauthorizedComponent) {
      UnauthorizedComponent = DefaultUnauthorizedComponent;
    }
    if (!!destinationPath) {
      props.router.push(destinationPath);
    }
    return <UnauthorizedComponent {...props} />;
  };
  return compose(
    withRouter,
    withAuthUser,
    branch(({ isAnon }) => isAnon, renderComponent(AnonComponent)),
  );
};
