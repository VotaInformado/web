import React from "react";

import propTypes from "prop-types";

// Components
import { Stack } from "@mui/material";
import MKTypography from "components/MKTypography";
import MKAvatar from "components/MKAvatar";

import MKBadge from "components/MKBadge";
import MKBox from "components/MKBox";

ProfileCard.propTypes = {
  avatar: propTypes.string,
  title: propTypes.string,
  subtitle: propTypes.oneOfType([propTypes.string, propTypes.object]),
  subtitle2: propTypes.string,
  badge: propTypes.shape({
    content: propTypes.string.isRequired,
    color: propTypes.string.isRequired,
  }),
  sx: propTypes.shape({
    stack: propTypes.object,
  }),
};

export default function ProfileCard({ avatar, title, subtitle, subtitle2, badge, sx }) {
  const badgeComponent = <MKBadge badgeContent={badge?.content} color={badge?.color} container width={150} />;
  return (
    <Stack direction="row" spacing={3} alignItems="center" sx={sx?.stack}>
      {avatar && <MKAvatar src={avatar} alt="profile-image" size="xxl" shadow="sm" />}
      <Stack height="100%" mt={0.5}>
        {title && (
          <MKTypography variant="h5" fontWeight="medium">
            {title}
          </MKTypography>
        )}
        {subtitle && <MKTypography variant="button">{subtitle}</MKTypography>}
        {subtitle2 && <MKTypography variant="button">{subtitle2}</MKTypography>}
        {badge && <MKBox mt={1}> {badgeComponent} </MKBox>}
      </Stack>
    </Stack>
  );
}
