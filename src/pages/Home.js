import React from 'react';

import { withAppLayout } from '../hoc';

import { Link } from 'react-router-dom';

const CARDS = [
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
  },
];

const HomePage = () => (
  <div className="HomePage">
    <div className="row">
      {CARDS.map(({ title, description, url }) => (
        <div className="card" key={title}>
          <div className="card-header">{title}</div>
          <div className="card-body">
            {description}
            <p>
              <Link className="wide btn btn-sm btn-primary" to={url}>
                {url}
              </Link>
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default withAppLayout(HomePage);
