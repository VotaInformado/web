import React from 'react';

// Components
import PageBase from 'pages/PageBase';
import ProfileCard from './components/Cards/ProfileCard';
import VotesCard from './components/Cards/VotesCard';
import FinancialCard from './components/Cards/FinancialCard';
import ActivityCard from './components/Cards/ActivityCard';
import NewsCard from './components/Cards/NewsCard';
import { Grid } from '@mui/material';
import ProjectsCard from './components/Cards/ProjectsCard';

const exampleLegislator = {
  name: 'Bruce Mars',
  party: 'Frente por la Patria',
  lastSeat: 'Senado (2019-2023)',
  isActive: true,
};

export default function Legislator() {
  return (
    <PageBase>
      <ProfileCard legislator={exampleLegislator} />
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} lg={4}>
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
        </Grid>
      </Grid>
    </PageBase>
  );
}
