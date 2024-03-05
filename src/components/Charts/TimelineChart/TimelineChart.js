import React from "react";

import propTypes from "prop-types";

// Components
import { Stepper } from "@mui/material";
import TimelineStep from "./TimelineStep";

export default function TimelineChart({ data, orientation }) {
  return (
    <Stepper orientation={orientation}>
      {data.map((item, index) => (
        <TimelineStep
          key={`${item.label}-${index}`}
          label={item.label}
          labelNode={item.labelNode}
          caption={item.caption}
          icon={item.icon}
        />
      ))}
    </Stepper>
  );
}

TimelineChart.propTypes = {
  orientation: propTypes.oneOf(["vertical", "horizontal"]),
  data: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string,
      labelNode: propTypes.node,
      caption: propTypes.string,
      icon: propTypes.string,
    })
  ).isRequired,
};

TimelineChart.defaultProps = {
  orientation: "horizontal",
};
