import React, { useEffect, useState } from "react";

// Components
import PageBase from "pages/PageBase";
import PartyProfileCard from "./components/Cards/PartyProfileCard";
import LegislatorsCard from "./components/Cards/MembersCard";
import VotesCard from "./components/Cards/VotesCard";
import ProjectsCard from "./components/Cards/ProjectsCard";
import { Grid, LinearProgress } from "@mui/material";
// Routes
import { useParams, useNavigate, generatePath } from "react-router-dom";
import PATHS from "routes/paths";
// Adapters
import { getParty } from "adapters/partyAdapter";

export default function Party() {
  const [party, setParty] = useState({});
  const navigation = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getParty(id)
      .then((res) => {
        setParty(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ocurrió un error al obtener el partido");
        navigation(PATHS.partySearch);
      });
  }, [id]);

  return (
    <PageBase>
      {!party?.id ? (
        <LinearProgress />
      ) : (
        <>
          <PartyProfileCard party={party} />
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md1={6} lg={4}>
              <LegislatorsCard
                totalLegislators={party.totalLegislators}
                countryRepresentation={party.countryRepresentation}
                actionLink={generatePath(PATHS.partyLegislators, { id })}
              />
            </Grid>
            <Grid item xs={12} md1={6} lg={4}>
              <VotesCard partyId={id} actionLink={generatePath(PATHS.partyVotes, { id })} />
            </Grid>
            <Grid item xs={12} md1={6} lg={4}>
              <ProjectsCard partyId={id} actionLink={generatePath(PATHS.partyProjects, { id })} />
            </Grid>
          </Grid>
        </>
      )}
    </PageBase>
  );
}
