import React, { useEffect, useState } from "react";

// Components
import PageBase from "pages/PageBase";
import LegislatorProfileCard from "./components/Cards/LegislatorProfileCard";
import VotesCard from "./components/Cards/VotesCard";
import FinancialCard from "./components/Cards/FinancialCard";
import ActivityCard from "./components/Cards/ActivityCard";
import NewsCard from "./components/Cards/NewsCard";
import MKButton from "components/MKButton";
import { Grid, LinearProgress, Box, Divider } from "@mui/material";
import ProjectsCard from "./components/Cards/ProjectsCard";
import { getLegislator } from "adapters/legislatorAdapter";
import { useParams, useNavigate, generatePath, Link } from "react-router-dom";
import { makePath } from "utils/pathGeneration";
import { toast } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";

// Routes
import PATHS from "routes/paths";

export default function Legislator() {
  const [legislator, setLegislator] = useState({});
  const [legislatorNews, setLegislatorNews] = useState([]);
  const navigation = useNavigate();
  const { id } = useParams();

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    getLegislator(id)
      .then((res) => {
        setLegislator(res);
        setLegislatorNews(res?.news.slice(0, 3));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ocurrió un error al obtener el legislador");
        navigation(PATHS.legislatorSearch);
      });
  }, [id]);

  return (
    <PageBase>
      {!legislator?.id ? (
        <LinearProgress />
      ) : (
        <>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6}>
              <LegislatorProfileCard legislator={legislator} />
              {isSmallScreen && <Divider orientation="horizontal" flexItem sx={{ width: "100%" }} />}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ justifyContent: "center" }}>
              <Box display="flex" justifyContent="center">
                <MKButton
                  variant="contained"
                  color="primary"
                  fullWidth={isSmallScreen}
                  component={Link}
                  to={makePath(PATHS.prediction, { searchParams: { legislador: legislator?.id } })}>
                  Predecir votos
                </MKButton>
              </Box>
            </Grid>
          </Grid>
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
              <FinancialCard affidavits={legislator.affidavits} />
            </Grid>
            <Grid item xs={12} md1={6} lg={4}>
              <ProjectsCard
                approved={legislator.projects?.filter((project) => project.status === "APPROVED")?.length}
                pending={legislator.projects?.filter((project) => project.status !== "APPROVED")?.length}
                actionLink={generatePath(PATHS.legislatorProjects, { id })}
              />
            </Grid>
            <Grid item xs={12} md1={6} lg={8}>
              <NewsCard news={legislatorNews} />
            </Grid>
          </Grid>
        </>
      )}
    </PageBase>
  );
}
