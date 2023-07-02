import React from 'react';

import propTypes from 'prop-types';

// Components
import CardBase from 'components/Cards/CardBase';
import ProjectsChart from 'pages/Legislator/components/Charts/ProjectsChart';
import MKBox from 'components/MKBox';
import MKBadge from 'components/MKBadge';
import { Grid } from '@mui/material';
import MKTypography from 'components/MKTypography';

ProjectsCard.propTypes = {
  approved: propTypes.number.isRequired,
  pending: propTypes.number.isRequired,
};

export default function ProjectsCard({ approved, pending }) {
  const goToProjects = {
    route: '/projects',
    tooltip: 'Ver todas los proyectos',
    label: 'Ver todos',
    icon: 'arrow_forward',
    // state: {}
  };

  return (
    <CardBase title="Proyectos presentados" action={goToProjects}>
      <Grid container my={2} spacing={2} alignItems="center" justifyContent="center">
        <Grid container item justifyContent="center" xs={12} sm={6}>
          <MKBadge badgeContent={`Aprobados: ${approved}`} color="success" container width={150} />
        </Grid>
        <Grid container item justifyContent="center" xs={12} sm={6}>
          <MKBadge badgeContent={`Pendientes: ${pending}`} color="info" container width={150} />
        </Grid>
        <Grid container item justifyContent="center" xs={12}>
          <MKTypography variant="body2">De un total de {approved + pending} proyectos</MKTypography>
        </Grid>
      </Grid>

      <MKBox width="100%" mt={5}>
        <ProjectsChart
          data={[
            { label: 'Aprobados', value: approved },
            { label: 'Pendientes', value: pending },
          ]}
        />
      </MKBox>
    </CardBase>
  );
}
