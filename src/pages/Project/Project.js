import React, { useEffect, useState } from "react";

// Components
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import PageBase from "pages/PageBase";
import ProjectProfileCard from "./components/Cards/ProjectProfileCard";
import AuthorsCard from "./components/Cards/AuthorsCard";
import VotesCard from "./components/Cards/VotesCard";
import TextCard from "components/Cards/TextCard";
import ProjectStatusStepper from "components/Steppers/ProjectStatusStepper";
// Adapters
import { getProject } from "adapters/projectAdapter";
// Paths and routes
import PATHS from "routes/paths";
import { useParams, generatePath } from "react-router-dom";

const exampleProject = {
  name: "PROYECTO DE COMUNICACIÓN QUE SOLICITA CREAR UN REGISTRO NACIONAL DE PERSONAS CON PARKINSON",
  number: "D-123/2021",
  sourceHouse: "Diputados",
  author: "Vega , María Clara Del Valle ",
  authorParty: "Cambiemos Fuerza Cívica Riojana",
  status: "Cámara de origen",
  votings: [
    {
      house: "Diputados",
      date: "2021-09-01",
      result: "Aprobado",
      affirmative: 176,
      negative: 1,
      abstention: 9,
      absent: 71,
    },
  ],
  authors: [
    {
      name: "Vega , María Clara Del Valle",
      party: "Cambiemos Fuerza Cívica Riojana",
    },
    {
      name: "Matute , Julio César",
      party: "Frente de Naides",
    },
    {
      name: "Pablo , Juan",
      party: "Frente de Naides",
    },
    {
      name: "Cristina , Fernández",
      party: "Frente de Naides",
    },
    {
      name: "Alberto , Fernández",
      party: "Frente de Naides",
    },
    {
      name: "Mauricio , Macri",
      party: "Frente de Naides",
    },
    {
      name: "Néstor , Kirchner",
      party: "Frente de Naides",
    },
    {
      name: "Carlos , Meeeee",
      party: "Frente de Naides",
    },
  ],
};

export default function Project() {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getProject(id)
      .then((res) => {
        setProject(res);
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
              {project.summary && (
                <Grid item xs={12}>
                  <TextCard title="Resumen" text={project.summary} />
                </Grid>
              )}
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
                <AuthorsCard authors={exampleProject.authors} />
              </Grid>
              {project.votings?.map((voting) => (
                <Grid key={voting.chamber} item xs={12}>
                  <VotesCard
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
