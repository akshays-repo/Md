import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Index as NotFoundPage } from '../components/404';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { withRouter } from 'react-router';
import { store } from '../reducers/configureStore';

const loadable = loader => React.lazy(loader); // added

const routes = [
  // System Pages
  {
    path: '/dashboard',
    component: loadable(() => import('../pages/Dashboard_Content/Dashboard')),
    exact: true,
    authorize: true,
  },
  {
    path: '/appointments',
    component: loadable(() => import('../pages/Dashboard_Content/Appointments')),
    exact: true,
    authorize: true,
  },
  {
    path: '/mypatients',
    component: loadable(() => import('../pages/Dashboard_Content/MyPatients')),
    exact: true,
    authorize: true,
  },
  {
    path: '/settings',
    component: loadable(() => import('../pages/Dashboard_Content/Settings')),
    exact: true,
    authorize: true,
  },
  {
    path: '/provider',
    component: loadable(() => import('../pages/Dashboard_Content/Provider')),
    exact: true,
    authorize: true,
  },
  {
    path: '/calender',
    component: loadable(() => import('../pages/Dashboard_Content/Calendar')),
    exact: true,
    authorize: true,
  },
  {
    path: '/message',
    component: loadable(() => import('../pages/Dashboard_Content/Message/index')),
    exact: true,
    authorize: true,
  },
  {
    path: '/templates',
    component: loadable(() => import('../pages/Dashboard_Content/Templates')),
    exact: true,
    authorize: true,
  },
  {
    path: '/forms',
    component: loadable(() => import('../pages/Dashboard_Content/Forms')),
    exact: true,
    authorize: true,
  },
  {
    path: '/analytics',
    component: loadable(() => import('../pages/Dashboard_Content/Analytics')),
    exact: true,
    authorize: true,
  },
  {
    path: '/tutorial',
    component: loadable(() => import('../pages/Dashboard_Content/Tutorials/index')),
    exact: true,
    authorize: true,
  },
  // {
  //   path: '/add-users',
  //   component: loadable(() => import('../pages/Dashboard_Content/AddUsers')),
  //   exact: true,
  //   authorize: true,
  // },
  {
    path: '/campaigns',
    component: loadable(() => import('../pages/Dashboard_Content/Campaigns')),
    exact: true,
    authorize: true,
  },
  {
    path: '/branch',
    component: loadable(() => import('../pages/Dashboard_Content/Branch')),
    exact: true,
    authorize: true,
  },
  {
    path: '/login',
    component: loadable(() => import('../pages/Login')),
    exact: true,
    authorize: false,
  },
  {
    path: '/online-appointment/:id',
    component: loadable(() => import('../pages/OnlineAppointmentForm')),
    exact: true,
    authorize: false,
    header: false,
  },
  {
    path: '/',
    component: loadable(() => import('../pages/LandingPage/index')),
    exact: true,
    authorize: false,
  },
  {
    path: '/logout',
    component: loadable(() => import('../pages/Dashboard_Content/Logout')),
    exact: true,
    authorize: false,
  },

  {
    path: '/templates/:id/actions',
    component: loadable(() => import('../pages/Dashboard_Content/Templates/templateActions')),
    exact: true,
    authorize: true,
  },
  {
    path: '/campaign/:id',
    component: loadable(() => import('../pages/Dashboard_Content/Campaigns/editCampaign')),
    exact: true,
    authorize: true,
  },
  {
    path: '/forms/:id',
    component: loadable(() => import('../pages/FormsFilling/')),
    exact: true,
    authorize: false,
    header: false,

  },
];

const Router = props => {
  return (
    <Switch>
      {routes.map(route => {
        if (route.authorize) {
          return (
            <PrivateRoute
              authorized={store.getState().Login.isLogin}
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
              header={route.header || true}
            />
          );
        }
      })}

      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withRouter(Router);
