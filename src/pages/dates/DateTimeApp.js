import React from 'react';

import { withSidebarAppLayout } from '../../hoc';

import DynamicRouter from '../../components/DynamicRouter';
import DateTimeHome from './DateTimeHome';
import Timezones from './Timezones';
import Durations from './Durations';

const routes = [
  { title: 'Home', url: '/utils/dates/home', Component: DateTimeHome },
  { title: 'Timezone', url: '/utils/dates/timezones', Component: Timezones },
  { title: 'Durations', url: '/utils/dates/durations', Component: Durations },
];

const DateTimeApp = () => <DynamicRouter routes={routes} />;

export default withSidebarAppLayout({
  title: 'Datetime Pages',
  routes,
})(DateTimeApp);
