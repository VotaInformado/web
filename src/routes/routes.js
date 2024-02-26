import React from "react";
// routes
import { Navigate, useRoutes } from "react-router-dom";
import PATHS from "routes/paths";
// layouts
import BaseLayout from "layouts/BaseLayout";
// pages
import Home from "pages/Home/Home";
import Law from "pages/Law/Law";
import LawSearch from "pages/LawSearch/LawSearch";
import Legislator from "pages/Legislator/Legislator";
import LegislatorProjects from "pages/LegislatorProjects/LegislatorProjects";
import LegislatorSearch from "pages/LegislatorSearch/LegislatorSearch";
import LegislatorVotes from "pages/LegislatorVotes/LegislatorVotes";
import News from "pages/News/News";
import ProjectSearch from "pages/ProjectSearch/ProjectSearch";
import Project from "pages/Project/Project";
import ProjectVoting from "pages/ProjectVoting/ProjectVoting";
import PartySearch from "pages/PartySearch/PartySearch";
import Party from "pages/Party/Party";
import PartyLegislators from "pages/PartyLegislators/PartyLegislators";
import PartyVotes from "pages/PartyVotes/PartyVotes";
import PartyProjects from "pages/PartyProjects/PartyProjects";
import Prediction from "pages/Prediction/Prediction";
import PredictionResult from "pages/PredictionResult/PredictionResult";
import PredictionVoting from "pages/PredictionVoting/PredictionVoting";
import Sources from "pages/Sources";
import NotFound from "pages/NotFound";
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: PATHS.root,
      element: <BaseLayout />,
      children: [
        { element: <Navigate to={PATHS.home} />, index: true },
        { path: PATHS.home, element: <Home /> },
        { path: PATHS.law, element: <Law /> },
        { path: PATHS.lawSearch, element: <LawSearch /> },
        { path: PATHS.legislator, element: <Legislator /> },
        { path: PATHS.legislatorVotes, element: <LegislatorVotes /> },
        { path: PATHS.legislatorProjects, element: <LegislatorProjects /> },
        { path: PATHS.legislatorSearch, element: <LegislatorSearch /> },
        { path: PATHS.news, element: <News /> },
        { path: PATHS.projectSearch, element: <ProjectSearch /> },
        { path: PATHS.project, element: <Project /> },
        { path: PATHS.projectVoting, element: <ProjectVoting /> },
        { path: PATHS.partySearch, element: <PartySearch /> },
        { path: PATHS.party, element: <Party /> },
        { path: PATHS.partyLegislators, element: <PartyLegislators /> },
        { path: PATHS.partyVotes, element: <PartyVotes /> },
        { path: PATHS.partyProjects, element: <PartyProjects /> },
        { path: PATHS.prediction, element: <Prediction /> },
        { path: PATHS.predictionResult, element: <PredictionResult /> },
        { path: PATHS.predictionVoting, element: <PredictionVoting /> },
        { path: PATHS.sources, element: <Sources /> },
        { path: PATHS.notFound, element: <NotFound /> },
      ],
    },
    { path: "*", element: <Navigate to={PATHS.notFound} /> },
  ]);
}
