import { lazy, useContext } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { AuthContext } from 'src/context/authContext/AuthContext';
// import Landingpage from 'src/components/landingpage';
import Loadable from 'src/layouts/full/shared/loadable/Loadable';
import Error from 'src/views/authentication/Error';
import ProtectedRoute from './ProtectedRoute';
import OrganizerList from 'src/views/apps/eCommerce/OrganizerList';

const ServiceList = Loadable(
  lazy(() => import('src/components/apps/ecommerce/serviceList/ServiceList')),
);
const InvoiceList = Loadable(lazy(() => import('src/components/apps/invoice/Invoice-list')));
const FullLayout = Loadable(lazy(() => import('src/layouts/full/FullLayout')));
const EcomProductList = Loadable(lazy(() => import('src/views/apps/eCommerce/EcomProductList')));
const ProfilePage = Loadable(lazy(() => import('src/views/apps/eCommerce/ProfilePage')));
const UserList = Loadable(lazy(() => import('src/views/apps/eCommerce/UsersList')));
const ReviewPage = Loadable(lazy(() => import('src/views/apps/reviews/ReviewPage')));
const UserProfile = Loadable(lazy(() => import('src/views/apps/user-profile/UserProfile')));
const Dashboard1 = Loadable(lazy(() => import('src/views/dashboard/Dashboard1')));
const Dashboard3 = Loadable(lazy(() => import('src/views/dashboard/Dashboard3')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login')));

const Router = [
  { path: '/auth/auth2/login', element: <Login2 /> },
  // { path: '/landingpage', element: <Landingpage /> },
  { path: '404', element: <Error /> },
  { path: '/auth/404', element: <Error /> },
  { path: '*', element: <Navigate to="/auth/404" /> },
  {
    path: '/',
    element: <ProtectedRoute />, // ✅ wrap everything in ProtectedRoute
    children: [
      {
        path: '/',
        element: <FullLayout />,
        children: [
          {
            path: '/',
            exact: true,
            element: <Dashboard1 />,
          },
          {
            path: '/Event/:id',
            exact: true,
            element: <Dashboard3 />,
          },
          {
            path: '/Event/list',
            exact: true,
            element: <EcomProductList />,
          },
          {
            path: '/organizers',
            exact: true,
            element: <OrganizerList />,
          },
          {
            path: '/users',
            exact: true,
            element: <UserList />,
          },
          {
            path: '/organizer/:id',
            exact: true,
            element: <ProfilePage />,
          },
          {
            path: '/services',
            exact: true,
            element: <ServiceList />,
          },
          {
            path: '/transactions',
            exact: true,
            element: <InvoiceList />,
          },
          {
            path: '/reports',
            exact: true,
            element: <ReviewPage />,
          },
          {
            path: '/apps/user-profile/profile',
            exact: true,
            element: <UserProfile />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
