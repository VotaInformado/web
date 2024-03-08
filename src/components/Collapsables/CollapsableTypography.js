import React, { useState, useEffect } from "react";

import propTypes from "prop-types";

// Components
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";

import MKTypography from "../MKTypography";

const TRANSITION_TIME = 500;
/*
  This component is a wrapper for MKTypography that adds a collapse button 

  It should utilize the Collapsable component, but in order to correctly manage the 
  ellipsis effect, it need all the logic inside this component, so it's not reused.
*/
CollapsableTypography.propTypes = {
  maxLines: propTypes.number,
  sx: propTypes.object,
  props: propTypes.shape(MKTypography.propTypes),
  children: propTypes.any,
};

export default function CollapsableTypography({ maxLines, sx, children, ...props }) {
  const [expanded, setExpanded] = useState(false);
  const [textEllipsis, setTextEllipsis] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  let typographyRef;

  useEffect(() => {
    if (expanded) setTextEllipsis(false);
    else {
      setTimeout(() => {
        setTextEllipsis(true);
      }, [TRANSITION_TIME]);
    }
  }, [expanded]);

  useEffect(() => {
    const containerHeight = typographyRef.clientHeight;
    const remHeight = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const linesOccupied = containerHeight / remHeight;
    setShowExpandButton(linesOccupied > maxLines * 1.6);
  }, [children]);

  return (
    <Stack direction="row" alignItems="center" spacing={0}>
      <Collapse
        in={expanded}
        onClick={() => setExpanded(!expanded)}
        collapsedSize={maxLines ? `${maxLines * 1.6}rem` : "1.6rem"}
        timeout={TRANSITION_TIME}>
        <MKTypography
          id="collapsable-typography"
          ref={(typography) => (typographyRef = typography)}
          {...props}
          sx={{
            ...sx,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: textEllipsis && !expanded ? maxLines : null,
            WebkitBoxOrient: "vertical",
          }}>
          {children}
        </MKTypography>
      </Collapse>
      {showExpandButton && (
        <IconButton size="small" onClick={() => setExpanded(!expanded)}>
          <Icon>{expanded ? "expand_less" : "expand_more"}</Icon>
        </IconButton>
      )}
    </Stack>
  );
}
