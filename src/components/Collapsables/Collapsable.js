import React, { useState, useEffect } from "react";

import propTypes from "prop-types";

// Components
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const TRANSITION_TIME = 500;

Collapsable.propTypes = {
  maxLines: propTypes.number,
  children: propTypes.any,
};

export default function Collapsable({ maxLines, children }) {
  const [expanded, setExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  let containerRef;

  useEffect(() => {
    if (!containerRef) return;
    const containerHeight = containerRef?.clientHeight;
    const remHeight = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const linesOccupied = containerHeight / remHeight;
    setShowExpandButton(linesOccupied > maxLines * 1.6);
  }, [containerRef, children]);

  return (
    <Stack direction="row" alignItems="center" spacing={0}>
      <Collapse
        in={expanded}
        onClick={() => setExpanded(!expanded)}
        collapsedSize={maxLines ? `${maxLines * 1.6}rem` : "1.6rem"}
        timeout={TRANSITION_TIME}>
        <Box ref={(container) => (containerRef = container)}>{children}</Box>
      </Collapse>
      {showExpandButton && (
        <IconButton size="small" onClick={() => setExpanded(!expanded)}>
          <Icon>{expanded ? "expand_less" : "expand_more"}</Icon>
        </IconButton>
      )}
    </Stack>
  );
}
