import React from 'react';

// Components
import PageBase from 'pages/PageBase';
import ProjectProfileCard from './components/Cards/ProjectProfileCard';
import AuthorsCard from './components/Cards/AuthorsCard';
import VotesCard from './components/Cards/VotesCard';
import TextCard from 'components/Cards/TextCard';
import StaticStepper from 'components/Steppers/StaticStepper';
import { Grid } from '@mui/material';

const exampleProject = {
  name: 'PROYECTO DE COMUNICACIÓN QUE SOLICITA CREAR UN REGISTRO NACIONAL DE PERSONAS CON PARKINSON',
  number: 'D-123/2021',
  sourceHouse: 'Diputados',
  author: 'Vega , María Clara Del Valle ',
  authorParty: 'Cambiemos Fuerza Cívica Riojana',
  status: 'Cámara de origen',
  votings: [
    {
      house: 'Diputados',
      date: '2021-09-01',
      result: 'Aprobado',
      affirmative: 176,
      negative: 1,
      abstention: 9,
      absent: 71,
    },
  ],
};

const steps = ['Cámara de origen', 'Cámara revisora'];

const exampleSummary = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
import { exampleContent } from './exampleContent';

export default function Project() {
  return (
    <PageBase>
      <Grid container direction="row" alignItems="center" rowSpacing={5}>
        <Grid item xs={12} lg={7}>
          <ProjectProfileCard project={exampleProject} />
        </Grid>
        <Grid item xs={12} lg={5}>
          <StaticStepper steps={steps} activeStep={1} />
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2}>
        <Grid container spacing={2} direction="column" item xs={12} lg={8}>
          <Grid item>
            <TextCard title="Resumen" text={exampleSummary} />
          </Grid>
          <Grid item>
            <TextCard title="Texto" text={exampleContent} />
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="column" item xs={12} lg={4}>
          <Grid item>
            <AuthorsCard />
          </Grid>
          {exampleProject.votings?.map((voting) => (
            <Grid key={voting.house} item>
              <VotesCard
                house={voting.house}
                afirmative={voting.affirmative}
                negative={voting.negative}
                abstention={voting.abstention}
                absent={voting.absent}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </PageBase>
  );
}
