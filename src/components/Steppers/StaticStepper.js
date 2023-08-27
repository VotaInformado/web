import React from "react";

import PropTypes from "prop-types";

import { Stepper, Step, StepLabel } from "@mui/material";

export default function StaticStepper({ steps, activeStep, orientation, showLabels }) {
  return (
    <Stepper activeStep={activeStep} orientation={orientation} alternativeLabel={orientation === "horizontal"}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{showLabels && label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

StaticStepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeStep: PropTypes.number.isRequired,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  showLabels: PropTypes.bool,
};

StaticStepper.defaultProps = {
  orientation: "horizontal",
  showLabels: true,
};
