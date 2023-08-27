// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import { Card, Tooltip, CardActions, CardContent, Grid } from "@mui/material";

// MK UI Dashboard React components
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
// Theme
import colors from "assets/theme/base/colors";

export default function MobileCard({ title, subtitle, overline, action, extraContent }) {
  const grey = colors.grey[400];
  return (
    <Card sx={{ width: "100%" }}>
      <Grid container>
        <Grid item xs={12} sm={10}>
          <CardContent
            style={{
              padding: "1em",
              "&:lastChild": {
                paddingBottom: 0,
              },
            }}>
            {overline && <MKTypography variant="overline">{overline}</MKTypography>}
            {title && (
              <MKTypography variant="h6" fontWeight="bold" textTransform="capitalize">
                {title}
              </MKTypography>
            )}
            {subtitle && <MKTypography variant="body2">{subtitle}</MKTypography>}
            {extraContent && <MKBox sx={{ mt: 2 }}>{extraContent}</MKBox>}
          </CardContent>
        </Grid>
        {action && (
          <Grid
            item
            xs={12}
            sm={2}
            sx={{
              borderTop: { xs: `0.5px solid ${grey}`, sm: "0px" },
              borderLeft: { xs: "0px", sm: `0.5px solid ${grey}` },
            }}>
            <CardActions
              disableSpacing
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-end", sm: "center" },
                alignItems: "center",
                flexDirection: { xs: "row", sm: "column" },
                height: "100%",
                paddingY: 0,
              }}>
              <Tooltip title={action?.tooltip || "tooltip"} placement="top">
                {action}
              </Tooltip>
            </CardActions>
          </Grid>
        )}
      </Grid>
    </Card>
  );
}

MobileCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  overline: PropTypes.string,
  action: PropTypes.node,
  extraContent: PropTypes.node,
};
