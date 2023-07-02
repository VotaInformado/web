import React from 'react';

import propTypes from 'prop-types';

// Components
import { Grid, Stack } from '@mui/material';
import MKTypography from 'components/MKTypography';
import MKAvatar from 'components/MKAvatar';

import MKBadge from 'components/MKBadge';
import MKBox from 'components/MKBox';

ProfileCard.propTypes = {
  avatar: propTypes.string,
  title: propTypes.string,
  subtitle: propTypes.string,
  subtitle2: propTypes.string,
  badge: propTypes.shape({
    content: propTypes.string.isRequired,
    color: propTypes.string.isRequired,
  }),
};

export default function ProfileCard({ avatar, title, subtitle, subtitle2, badge }) {
  const badgeComponent = <MKBadge badgeContent={badge.content} color={badge.color} container width={150} />;

  return (
    <Stack direction="row" spacing={3} alignItems="center">
      {avatar && <MKAvatar src={avatar} alt="profile-image" size="xl" shadow="sm" />}
      <Stack height="100%" mt={0.5}>
        {title && (
          <MKTypography variant="h5" fontWeight="medium">
            {title}
          </MKTypography>
        )}
        {subtitle && (
          <MKTypography variant="button" color="text" fontWeight="regular">
            {subtitle}
          </MKTypography>
        )}
        {subtitle2 && (
          <MKTypography variant="button" color="text" fontWeight="regular">
            {subtitle2}
          </MKTypography>
        )}
        {badge && <MKBox mt={1}> {badgeComponent} </MKBox>}
      </Stack>
    </Stack>
  );
}
