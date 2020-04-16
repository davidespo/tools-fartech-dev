import React from 'react';

import { withSidebarAppLayout } from '../../hoc';

import DynamicRouter from '../../components/DynamicRouter';
import DateTimeHome from './DateTimeHome';
import Timezones from './Timezones';

const routes = [
  { title: 'Home', url: '/utils/dates/home', Component: DateTimeHome },
  { title: 'Timezone', url: '/utils/dates/timezones', Component: Timezones },
];

const DateTimeApp = () => <DynamicRouter routes={routes} />;

export default withSidebarAppLayout({
  title: 'Datetime Pages',
  routes,
})(DateTimeApp);
