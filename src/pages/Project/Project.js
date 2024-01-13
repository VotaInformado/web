import React, { useEffect, useState } from "react";

// Components
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import MKButton from "components/MKButton";
import CardBase from "components/Cards/CardBase";
import PageBase from "pages/PageBase";
import ProjectProfileCard from "./components/Cards/ProjectProfileCard";
import AuthorsCard from "./components/Cards/AuthorsCard";
import VotesCard from "./components/Cards/VotesCard";
import TextCard from "components/Cards/TextCard";
import ProjectStatusStepper from "components/Steppers/ProjectStatusStepper";
import SummaryCard from "components/Cards/SummaryCard";
import ParliamentsVotesCard from "components/Cards/ParliamentVotesCard";
// Adapters
import { getProject, createLawProjectSummary } from "adapters/projectAdapter";
// Paths and routes
import PATHS from "routes/paths";
import { useParams, generatePath, Link } from "react-router-dom";

export default function Project() {
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const generateAISummary = (law) => {
    setSummaryLoading(true);
    createLawProjectSummary(law.id).then((res) => {
      setSummary(res);
      setSummaryLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getProject(id)
      .then((res) => {
        setProject(res);
        setSummary(res.ai_generated_summary);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageBase>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <Grid container alignItems="center" rowSpacing={5}>
            <Grid item xs={12} lg={7}>
              <ProjectProfileCard project={project} />
            </Grid>
            <Grid item xs={12} lg={5}>
              <ProjectStatusStepper status={project.status} />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2} alignItems="flex-start">
            <Grid container item xs={12} lg={7} spacing={2}>
              <Grid item xs={12}>
                <TextCard
                  title="Texto"
                  text={project.text || ""}
                  link={project.link}
                  sx={{ textContainer: { overflowY: "auto", maxHeight: { xs: 500, lg: 1500 } } }}
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} lg={5} spacing={2}>
              <Grid item xs={12}>
                <CardBase>
                  <MKButton
                    variant="contained"
                    color="primary"
                    fullWidth
                    component={Link}
                    to={PATHS.prediction + `?proyecto=${project.id}`}>
                    Predecir votos para este proyecto
                  </MKButton>
                </CardBase>
              </Grid>
              <Grid item xs={12}>
                <SummaryCard
                  action={() => generateAISummary(project)}
                  summary={summary}
                  summaryLoading={summaryLoading}
                />
              </Grid>
              <Grid item xs={12}>
                <AuthorsCard authors={project.authors} />
              </Grid>
              {project.votings?.map((voting) => (
                <Grid key={voting.chamber} item xs={12}>
                  <ParliamentsVotesCard
                    house={voting.chamber}
                    date={voting.date}
                    afirmative={voting.afirmatives}
                    negative={voting.negatives}
                    abstention={voting.abstentions}
                    absent={voting.absents}
                    actionLink={
                      generatePath(PATHS.projectVoting, { id: project.id }) +
                      `?camara=${voting.chamber}&fecha=${voting.date}`
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      )}
    </PageBase>
  );
}
