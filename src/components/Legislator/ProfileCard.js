import React from 'react';

import propTypes from 'prop-types';

// Components
import { Grid, Stack } from '@mui/material';
import MKTypography from 'components/MKTypography';
import MKAvatar from 'components/MKAvatar';

import burceMars from 'assets/images/bruce-mars.jpg';
import MKBadge from 'components/MKBadge';
import MKBox from 'components/MKBox';

ProfileCard.propTypes = {
  legislator: propTypes.shape({
    name: propTypes.string.isRequired,
    party: propTypes.string.isRequired,
    lastSeat: propTypes.string.isRequired,
    isActive: propTypes.bool.isRequired,
  }).isRequired,
};

export default function ProfileCard({ legislator }) {
  const badge = (
    <MKBadge
      badgeContent={legislator.isActive ? 'En actividad' : 'No activo'}
      color={legislator.isActive ? 'success' : 'error'}
      container
      width={150}
    />
  );

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item>
        <MKAvatar src={burceMars} alt="profile-image" size="xl" shadow="sm" />
      </Grid>
      <Grid item>
        <Stack height="100%" mt={0.5} lineHeight={1}>
          <MKTypography variant="h5" fontWeight="medium">
            {legislator.name}
          </MKTypography>
          <MKTypography variant="button" color="text" fontWeight="regular">
            {legislator.party}
          </MKTypography>
          <MKTypography variant="button" color="text" fontWeight="regular">
            {legislator.lastSeat}
          </MKTypography>
          <Stack mt={1} direction="row" justifyContent="stretch">
            {badge}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
