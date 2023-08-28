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

export default function CardBase({ title, action, children }) {
  return (
    <Card>
      <MKBox display="flex" justifyContent="space-between" alignItems="center" pt={(title || action) && 2} px={2}>
        {title && (
          <MKTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            {title}
          </MKTypography>
        )}
        {action && (
          <Tooltip title={action.tooltip} placement="top">
            <MKButton
              component={Link}
              to={action.route}
              state={action.state}
              variant="text"
              color="primary"
              size="small"
              target={action.openInNewTab ? "_blank" : undefined}
              sx={{ p: 0 }}
              endIcon={<Icon>{action.icon || "arrow_forward"}</Icon>}>
              {action.label ?? "Ver más"}
            </MKButton>
          </Tooltip>
        )}
      </MKBox>
      <MKBox p={2}>{children}</MKBox>
    </Card>
  );
}

CardBase.propTypes = {
  title: PropTypes.string,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
    label: PropTypes.string,
    icon: PropTypes.string,
    state: PropTypes.object,
    openInNewTab: PropTypes.bool,
  }),
  children: PropTypes.node.isRequired,
};

CardBase.defaultProps = {
  action: null,
};
