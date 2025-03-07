import { lazy, Suspense } from 'react';
import Loading from '@components/loading';
import MainLayout from '@layout/main';

const Home = lazy(() => import('@views/pages/home'));
const Register = lazy(() => import('@views/pages/register'));

const DashboardRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
    ],
  },
];

export default DashboardRoutes;
