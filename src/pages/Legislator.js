import React from 'react';

// Components
import PageBase from 'pages/PageBase';
import ProfileCard from 'components/Legislator/ProfileCard';
import VotesCard from 'components/Legislator/VotesCard';
import FinancialCard from 'components/Legislator/FinancialCard';
import { Grid } from '@mui/material';

const exampleLegislator = {
  name: 'Bruce Mars',
  party: 'Frente por la Patria',
  lastSeat: 'Senado (2019-2023)',
};

export default function Legislator() {
  return (
    <PageBase>
      <ProfileCard legislator={exampleLegislator} />
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <VotesCard afirmative={13} negative={10} abstention={1} absent={3} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <FinancialCard />
        </Grid>
        <Grid item xs={12} lg={4}>
          <VotesCard afirmative={13} negative={10} abstention={1} absent={3} />
        </Grid>
      </Grid>
    </PageBase>
  );
}
