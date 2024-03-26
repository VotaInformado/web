import PropTypes from "prop-types";

import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import MKTypography from "components/MKTypography";

LoadingMessage.propTypes = {
  message: PropTypes.string,
  sx: PropTypes.object,
};

export default function LoadingMessage({ message, sx }) {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" sx={{ ...sx }}>
      <MKTypography variant="body2">{message}</MKTypography>
      <CircularProgress size={20} style={{ marginLeft: 8 }} />
    </Stack>
  );
}
