import React, { useState, useEffect } from "react";

import propTypes from "prop-types";

// Components
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

const TRANSITION_TIME = 500;

CollapsableChips.propTypes = {
  maxLines: propTypes.number,
  values: propTypes.arrayOf(propTypes.string),
};

export default function CollapsableChips({ maxLines, values }) {
  const [expanded, setExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  let chipsContainerRef;

  useEffect(() => {
    const containerHeight = chipsContainerRef?.clientHeight;
    const remHeight = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const linesOccupied = containerHeight / remHeight;
    setShowExpandButton(linesOccupied > maxLines * 1.6);
  }, [values]);

  return (
    <Stack direction="row" alignItems="center" spacing={0}>
      <Collapse
        in={expanded}
        onClick={() => setExpanded(!expanded)}
        collapsedSize={maxLines ? `${maxLines * 1.6}rem` : "1.6rem"}
        timeout={TRANSITION_TIME}>
        <Stack ref={(stack) => (chipsContainerRef = stack)} direction="row" flexWrap="wrap" gap={0.5}>
          {values?.map((value, index) => (
            <Chip
              key={`${index}_${value}`}
              label={value}
              size="small"
              sx={{
                width: "fit-content",
                height: "auto",
                "& .MuiChip-label": {
                  display: "block",
                  whiteSpace: "normal",
                  textAlign: "center",
                },
              }}
            />
          ))}
        </Stack>
      </Collapse>
      {showExpandButton && (
        <IconButton size="small" onClick={() => setExpanded(!expanded)}>
          <Icon>{expanded ? "expand_less" : "expand_more"}</Icon>
        </IconButton>
      )}
    </Stack>
  );
}
