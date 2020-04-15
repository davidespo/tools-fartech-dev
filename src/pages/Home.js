import React from 'react';
import routes from '../routes';

import { withAppLayout } from '../hoc';

import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="HomePage">
    <div className="row">
      {routes.map(({ title, description, url }) => (
        <div className="p-2" key={url}>
          <div className="card">
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
        </div>
      ))}
    </div>
  </div>
);

export default withAppLayout(HomePage);
