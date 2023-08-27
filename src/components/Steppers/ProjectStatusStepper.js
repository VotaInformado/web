import PropTypes from "prop-types";
import StaticStepper from "components/Steppers/StaticStepper";

const VISIBLE_STEPS = ["Cámara de origen", "Cámara revisora"];
const REAL_STEPS = ["Cámara de origen", "Cámara revisora", "Aprobado"];

ProjectStatusStepper.propTypes = {
  status: PropTypes.oneOf(REAL_STEPS),
  showLabels: PropTypes.bool,
};

ProjectStatusStepper.defaultProps = {
  showLabels: true,
};

export default function ProjectStatusStepper({ status, showLabels }) {
  const activeStep = REAL_STEPS.indexOf(status);
  return <StaticStepper steps={VISIBLE_STEPS} activeStep={activeStep} showLabels={showLabels} />;
}
