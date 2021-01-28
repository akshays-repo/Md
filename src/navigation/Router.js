import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Index as NotFoundPage } from '../components/404';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { withRouter } from 'react-router';

const loadable = loader => React.lazy(loader); // added

const routes = [
  // System Pages
  {
    path: '/',
    component: loadable(() => import('../pages/Dashboard_Content/Dashboard')),
    exact: true,
    authorize: false,
  },
  {
    path: '/appointments',
    component: loadable(() => import('../pages/Dashboard_Content/Appointments')),
    exact: true,
    authorize: false,
  },{
    path: '/mypatients',
    component: loadable(() => import('../pages/Dashboard_Content/MyPatients')),
    exact: true,
    authorize: false,
  },{
    path: '/provider',
    component: loadable(() => import('../pages/Dashboard_Content/Provider')),
    exact: true,
    authorize: false,
  },{
    path: '/calender',
    component: loadable(() => import('../pages/Dashboard_Content/Calendar')),
    exact: true,
    authorize: false,
  },
  {
    path: '/message',
    component: loadable(() => import('../pages/Dashboard_Content/Message')),
    exact: true,
    authorize: false,
  },{
    path: '/templates',
    component: loadable(() => import('../pages/Dashboard_Content/Templates')),
    exact: true,
    authorize: false,
  },{
    path: '/froms',
    component: loadable(() => import('../pages/Dashboard_Content/Forms')),
    exact: true,
    authorize: false,
  },
  {
    path: '/analytics',
    component: loadable(() => import('../pages/Dashboard_Content/Analytics')),
    exact: true,
    authorize: false,
  },
  {
    path: '/campaigns',
    component: loadable(() => import('../pages/Dashboard_Content/Campaigns')),
    exact: true,
    authorize: false,
  },
  {
    path: '/branch',
    component: loadable(() => import('../pages/Dashboard_Content/Branch')),
    exact: true,
    authorize: false,
  },
];

const Router = props => {
  const { history, result } = props;

  return (
    <Switch>
      {routes.map(route => {
        if (route.authorize) {
          return (
            <PrivateRoute
              authorized={result}
              key={route.path}
              keys={route.path}
              exact={route.exact}
              {...route}
              {...props}
            />
          );
        } else {
          return (
            <PublicRoute
              {...props}
              path={route.path}
              component={route.component}
              key={route.path}
              exact={route.exact}
              header={route.header}
              footer={route.footer}
            />
          );
        }
      })}

      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withRouter(Router);
