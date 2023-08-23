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
import { useParams } from "react-router-dom";

const exampleLegislator = {
  name: "Bruce Mars",
  party: "Frente por la Patria",
  lastSeat: "Senador (2019-2023)",
  isActive: true,
};

export default function Legislator() {
  const [legislator, setLegislator] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getLegislator(id).then((res) => {
      setLegislator(res);
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
          <VotesCard afirmative={13} negative={10} abstention={1} absent={3} />
        </Grid>
        <Grid item xs={12} md1={6} lg={4}>
          <FinancialCard />
        </Grid>
        <Grid item xs={12} md1={6} lg={4}>
          <ProjectsCard approved={2} pending={31} />
        </Grid>
        <Grid item xs={12} lg={8}>
          <NewsCard />
        </Grid>
      </Grid>
    </PageBase>
  );
}
