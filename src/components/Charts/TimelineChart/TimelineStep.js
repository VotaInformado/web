import propTypes from "prop-types";
// Components
import { Step, StepLabel, Icon } from "@mui/material";
import MKTypography from "components/MKTypography";

export default function TimelineStep({ label, labelNode, caption, icon, ...rest }) {
  const getIcon = () => {
    const stepIcon = icon ?? "fiber_manual_record";
    return <Icon sx={{ m: 0.5 }}>{stepIcon}</Icon>;
  };

  const getCaption = () => <MKTypography variant="caption">{caption}</MKTypography>;

  const getLabel = () => {
    if (labelNode) return labelNode;
    return <MKTypography variant="body2">{label}</MKTypography>;
  };
  return (
    <Step {...rest}>
      <StepLabel StepIconComponent={getIcon} optional={getCaption()}>
        {getLabel()}
      </StepLabel>
    </Step>
  );
}

TimelineStep.propTypes = {
  label: propTypes.string,
  labelNode: propTypes.node,
  caption: propTypes.string,
  icon: propTypes.string,
  requiredProps: function (props, propName, componentName) {
    if (!props.label && !props.labelNode) {
      return new Error(`One of 'label' or 'labelNode' is required in '${componentName}'.`);
    }
  },
};
