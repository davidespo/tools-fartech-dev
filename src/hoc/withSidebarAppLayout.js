import React from 'react';

import Header from '../components/Header';
import NavSidebar from '../components/NavSidebar';

export const withSidebarAppLayout = ({ routes = [], title }) => (Page) => (
  props,
) => (
  <>
    <Header />
    <div className="row" style={{ minHeight: '75vh' }}>
      <div className="col-2 border-right p-3" style={{ width: '200px' }}>
        {title && <p className="lead">{title}</p>}
        <NavSidebar routes={routes} {...props} />
      </div>
      <div className="col-10 py-3 px-5 flex-grow-1">
        <Page {...props} />
      </div>
    </div>
  </>
);
