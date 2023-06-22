import React from 'react';
// routes
import { Navigate, useRoutes } from 'react-router-dom';
import PATHS from 'routes/paths';
// layouts
import BaseLayout from 'layouts/BaseLayout';
// pages
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Legislator from 'pages/Legislator';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: PATHS.root,
      element: <BaseLayout />,
      children: [
        { element: <Navigate to={PATHS.home} />, index: true },
        { path: PATHS.home, element: <Home /> },
        { path: PATHS.childrenRoute, element: <Home /> },
        { path: PATHS.legislator, element: <Legislator /> },
        { path: PATHS.notFound, element: <NotFound /> },
      ],
    },
    { path: '*', element: <Navigate to={PATHS.notFound} /> },
  ]);
}
