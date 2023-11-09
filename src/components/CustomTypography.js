import React from "react";

import propTypes from "prop-types";

// Components
import Tooltip from "@mui/material/Tooltip";
import MKTypography from "./MKTypography";

CustomTypography.propTypes = {
  tooltip: propTypes.bool,
  maxLines: propTypes.number,
  sx: propTypes.object,
  props: propTypes.shape(MKTypography.propTypes),
  children: propTypes.any,
};

export default function CustomTypography({ tooltip, maxLines, sx, children, ...props }) {
  const overflowSx = maxLines
    ? {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: "vertical",
      }
    : {};

  const typography = (
    <MKTypography
      {...props}
      sx={{
        ...overflowSx,
        ...sx,
      }}>
      {children}
    </MKTypography>
  );

  return tooltip ? (
    <Tooltip title={children} enterDelay={500}>
      {typography}
    </Tooltip>
  ) : (
    typography
  );
}
