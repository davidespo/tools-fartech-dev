import React from 'react';

import Header from '../components/Header';

export const withAppLayout = (Page) => (props) => (
  <>
    <Header />
    <div className="container">
      <Page {...props} />
    </div>
  </>
);
