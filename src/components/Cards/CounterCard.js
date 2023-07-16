// react-countup components
import CountUp from "react-countup";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// MK UI Dashboard React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// MK UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import { Grid } from "@mui/material";

function CounterCard({ color, count, title, prefix, suffix, endIcon, filled }) {
  const { secondary } = colors;
  const { borderWidth, borderRadius } = borders;

  return (
    <Card sx={{ backgroundColor: filled ? colors.grey[100] : null, p: 2 }}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <MKTypography variant="h6" color={color} fontWeight="medium" textTransform="capitalize">
            {title}
          </MKTypography>
          <MKTypography variant="h4" fontWeight="bold">
            {prefix && (
              <MKTypography component="span" variant="h5" fontWeight="bold">
                {prefix}
              </MKTypography>
            )}
            <MKBox display="inline-block" mx={0.5}>
              <CountUp end={count} duration={1} separator="." />
            </MKBox>
            {suffix && (
              <MKTypography component="span" variant="h5" fontWeight="bold">
                {suffix}
              </MKTypography>
            )}
          </MKTypography>
        </Grid>
        <Grid
          container
          item
          justifyContent="center"
          alignItems="center"
          sx={{
            borderRadius: borderRadius.md,
            border: `${borderWidth[1]} solid ${secondary.main}`,
            width: { xs: 50, sm: 60 },
            height: { xs: 50, sm: 60 },
            backgroundColor: secondary.focus,
          }}>
          <Icon fontSize="large" color="primary">
            {endIcon}
          </Icon>
        </Grid>
      </Grid>
    </Card>
  );
}

CounterCard.defaultProps = {
  color: "info",
  prefix: "",
  suffix: "",
  filled: true,
};

CounterCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  endIcon: PropTypes.string.isRequired,
  filled: PropTypes.bool,
};

export default CounterCard;
