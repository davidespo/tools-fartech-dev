import React from 'react';

import IdUtils from './pages/IdUtils';
import Base64Utils from './pages/Base64Utils';
import DiffUtils from './pages/DiffUtils';
import DateTimeApp from './pages/dates/DateTimeApp';

export default [
  {
    title: 'ID Utils',
    description: (
      <p>
        Support for <span className="mono badge badge-info">UUID v1</span>{' '}
        <span className="mono badge badge-info">UUID v4</span>{' '}
        <span className="mono badge badge-info">Short ID</span>.
      </p>
    ),
    url: '/utils/ids',
    component: IdUtils,
  },
  {
    title: 'Base 64 Utils',
    description: (
      <p>
        Quick debugging for <span className="mono badge badge-info">atob</span>{' '}
        and <span className="mono badge badge-info">btoa</span>.
      </p>
    ),
    url: '/utils/base64',
    component: Base64Utils,
  },
  {
    title: 'Diff Utils',
    description: <p>Compare two strings.</p>,
    url: '/utils/diff',
    component: DiffUtils,
  },
  {
    title: 'Datetime Utils',
    description: <p>Date times are hard; tools to make life easier.</p>,
    url: '/utils/dates',
    exact: false,
    component: DateTimeApp,
  },
];
