// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// MK UI Dashboard React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import { CardActions, CardHeader, CardContent, Grid, Stack, Divider } from "@mui/material";
import colors from "assets/theme/base/colors";

export default function TableRowCard({ title, subtitle, overline, action, children }) {
  const grey = colors.grey[400];
  return (
    <Card sx={{ width: "100%" }}>
      <Grid container>
        <Grid item xs={12} sm={10}>
          <CardContent
            style={{
              padding: "1em",
              "&:last-child": {
                paddingBottom: 0,
              },
            }}>
            <MKTypography variant="overline">{overline}</MKTypography>
            <MKTypography variant="h6" fontWeight="bold" textTransform="capitalize">
              {title}
            </MKTypography>
            <MKTypography variant="body2">{subtitle}</MKTypography>
          </CardContent>
        </Grid>
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
      </Grid>
    </Card>
  );
}

TableRowCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  overline: PropTypes.string,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
    label: PropTypes.string,
    icon: PropTypes.string,
    state: PropTypes.object,
  }),
  children: PropTypes.node.isRequired,
};

TableRowCard.defaultProps = {
  action: null,
};
