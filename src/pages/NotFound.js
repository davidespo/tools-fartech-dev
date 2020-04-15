import React from 'react';

import { withAppLayout } from '../hoc';

const NotFound = () => (
  <div
    className="NotFound text-center text-muted"
    style={{ paddingTop: '30vh' }}
  >
    <h1>404 :: Page Not Found</h1>
  </div>
);

export default withAppLayout(NotFound);
