import React from 'react';

// Components
import PageBase from 'pages/PageBase';
import ProjectProfileCard from './components/Cards/ProjectProfileCard';
import { Grid } from '@mui/material';

const exampleProject = {
  name: 'PROYECTO DE COMUNICACIÓN QUE SOLICITA CREAR UN REGISTRO NACIONAL DE PERSONAS CON PARKINSON',
  number: 'D-123/2021',
  author: 'Vega , María Clara Del Valle ',
  authorParty: 'Cambiemos Fuerza Cívica Riojana',
  status: 'En curso',
};

export default function Project() {
  return (
    <PageBase>
      <ProjectProfileCard project={exampleProject} />
      <Grid container spacing={2} mt={2}>
        {/* <Grid item xs={12} lg={4}>
          <ActivityCard />
        </Grid>
        <Grid item xs={12} lg={4}>
          <VotesCard afirmative={13} negative={10} abstention={1} absent={3} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <FinancialCard />
        </Grid>
        <Grid item xs={4}>
          <ProjectsCard approved={2} pending={31} />
        </Grid>
        <Grid item xs={8}>
          <NewsCard />
        </Grid> */}
      </Grid>
    </PageBase>
  );
}
