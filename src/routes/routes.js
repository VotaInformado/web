import React from "react";
// routes
import { Navigate, useRoutes } from "react-router-dom";
import PATHS from "routes/paths";
// layouts
import BaseLayout from "layouts/BaseLayout";
// pages
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Legislator from "pages/Legislator/Legislator";
import LegislatorSearch from "pages/LegislatorSearch/LegislatorSearch";
import ProjectSearch from "pages/ProjectSearch/ProjectSearch";
import Project from "pages/Project/Project";
import ProjectVoting from "pages/ProjectVoting/ProjectVoting";
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: PATHS.root,
      element: <BaseLayout />,
      children: [
        { element: <Navigate to={PATHS.home} />, index: true },
        { path: PATHS.home, element: <Home /> },
        { path: PATHS.legislator, element: <Legislator /> },
        { path: PATHS.legislatorSearch, element: <LegislatorSearch /> },
        { path: PATHS.projectSearch, element: <ProjectSearch /> },
        { path: PATHS.project, element: <Project /> },
        { path: PATHS.projectVoting, element: <ProjectVoting /> },
        { path: PATHS.notFound, element: <NotFound /> },
      ],
    },
    { path: "*", element: <Navigate to={PATHS.notFound} /> },
  ]);
}
