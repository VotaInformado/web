import propTypes from 'prop-types';
// Components
import { Step, StepLabel, Icon } from '@mui/material';
import MKTypography from 'components/MKTypography';

export default function TimelineStep({ label, caption, icon, ...rest }) {
  const getIcon = () => {
    const stepIcon = icon ?? 'fiber_manual_record';
    return <Icon sx={{ m: 0.5 }}>{stepIcon}</Icon>;
  };

  const getCaption = () => <MKTypography variant="caption">{caption}</MKTypography>;

  return (
    <Step {...rest}>
      <StepLabel StepIconComponent={getIcon} optional={getCaption()}>
        <MKTypography variant="body2">{label}</MKTypography>
      </StepLabel>
    </Step>
  );
}

TimelineStep.propTypes = {
  label: propTypes.string.isRequired,
  caption: propTypes.string,
  icon: propTypes.string,
};
