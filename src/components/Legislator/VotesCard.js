import React from 'react';

import propTypes from 'prop-types';

// Components
import CardBase from 'components/Cards/CardBase';
import VotesChart from 'components/Charts/VotesChart';
import MKBox from 'components/MKBox';
import MKBadge from 'components/MKBadge';
import { Grid } from '@mui/material';
import MKTypography from 'components/MKTypography';

VotesCard.propTypes = {
  afirmative: propTypes.number.isRequired,
  negative: propTypes.number.isRequired,
  abstention: propTypes.number.isRequired,
  absent: propTypes.number.isRequired,
};

export default function VotesCard({ afirmative, negative, abstention, absent }) {
  const goToVotes = {
    route: '/votes',
    tooltip: 'Ver todas las votaciones',
    label: 'Ver todas',
    icon: 'arrow_forward',
    // state: {}
  };

  return (
    <CardBase title="Votaciones" action={goToVotes}>
      <Grid container my={2} spacing={2} alignItems="center" justifyContent="center">
        <Grid container item justifyContent="center" xs={12} sm={6}>
          <MKBadge badgeContent={`Afirmativos: ${afirmative}`} color="success" container width={150} />
        </Grid>
        <Grid container item justifyContent="center" xs={12} sm={6}>
          <MKBadge badgeContent={`Negativos: ${negative}`} color="error" container width={150} />
        </Grid>
        <Grid container item justifyContent="center" xs={12} sm={6}>
          <MKBadge badgeContent={`Abstenciones: ${abstention}`} color="info" container width={150} />
        </Grid>
        <Grid container item justifyContent="center" xs={12} sm={6}>
          <MKBadge badgeContent={`Ausentes: ${absent}`} color="warning" container width={150} />
        </Grid>
        <Grid container item justifyContent="center" xs={12}>
          <MKTypography variant="body2">
            De un total de {afirmative + negative + abstention + absent} votaciones
          </MKTypography>
        </Grid>
      </Grid>

      <MKBox width="100%" mt={5}>
        <VotesChart
          data={[
            { label: 'Afirmativos', value: afirmative },
            { label: 'Negativos', value: negative },
            { label: 'Abstenciones', value: abstention },
            { label: 'Ausentes', value: absent },
          ]}
        />
      </MKBox>
    </CardBase>
  );
}
