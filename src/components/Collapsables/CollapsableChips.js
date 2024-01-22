import React, { useState, useEffect } from "react";

import propTypes from "prop-types";

// Components
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Collapsable from "./Collapsable";

CollapsableChips.propTypes = {
  maxLines: propTypes.number,
  values: propTypes.arrayOf(propTypes.string),
};

export default function CollapsableChips({ maxLines, values }) {
  return (
    <Collapsable maxLines={maxLines}>
      <Stack direction="row" flexWrap="wrap" gap={0.5}>
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
    </Collapsable>
  );
}
