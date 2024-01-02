import React, { useEffect, useState } from "react";

// Components
import PageBase from "pages/PageBase";
import LegislatorProfileCard from "./components/Cards/LegislatorProfileCard";
import VotesCard from "./components/Cards/VotesCard";
import FinancialCard from "./components/Cards/FinancialCard";
import ActivityCard from "./components/Cards/ActivityCard";
import NewsCard from "./components/Cards/NewsCard";
import { Grid } from "@mui/material";
import ProjectsCard from "./components/Cards/ProjectsCard";
import { getLegislator } from "adapters/legislatorAdapter";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { toast } from "react-toastify";
// Routes
import PATHS from "routes/paths";

export default function Legislator() {
  const [legislator, setLegislator] = useState({});
  const navigation = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getLegislator(id)
      .then((res) => {
        setLegislator(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ocurrió un error al obtener el legislador");
        navigation(PATHS.legislatorSearch);
      });
  }, [id]);

  return (
    <PageBase>
      <LegislatorProfileCard legislator={legislator} />
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md1={6} lg={4}>
          <ActivityCard events={legislator.seats} />
        </Grid>
        <Grid item xs={12} md1={6} lg={4}>
          <VotesCard
            afirmative={legislator.votes?.afirmatives}
            negative={legislator.votes?.negatives}
            abstention={legislator.votes?.abstentions}
            absent={legislator.votes?.absents}
            actionLink={generatePath(PATHS.legislatorVotes, { id })}
          />
        </Grid>
        <Grid item xs={12} md1={6} lg={4}>
          <FinancialCard />
        </Grid>
        <Grid item xs={12} md1={6} lg={4}>
          <ProjectsCard
            approved={legislator.projects?.filter((project) => project.status === "APPROVED")?.length}
            pending={legislator.projects?.filter((project) => project.status !== "APPROVED")?.length}
            actionLink={generatePath(PATHS.legislatorProjects, { id })}
          />
        </Grid>
        <Grid item xs={12} lg={8}>
          <NewsCard />
        </Grid>
      </Grid>
    </PageBase>
  );
}
