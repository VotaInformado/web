// react-routers components
import { Link } from 'react-router-dom';

// prop-types is library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';

// MK UI Dashboard React components
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';

export default function CardBase({ title, action, children }) {
  return (
    <Card>
      <MKBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        {title && (
          <MKTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            {title}
          </MKTypography>
        )}
        {action && (
          <MKTypography component={Link} to={action.route} state={action.state} variant="body2" color="secondary">
            <Tooltip title={action.tooltip} placement="top">
              <Icon>{action.icon || 'arrow_forward'}</Icon>
            </Tooltip>
          </MKTypography>
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
    icon: PropTypes.string,
    state: PropTypes.object,
  }),
  children: PropTypes.node.isRequired,
};

CardBase.defaultProps = {
  title: '',
  action: null,
};
