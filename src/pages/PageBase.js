import React, { useMemo } from 'react';

import PropTypes from 'prop-types';
// Material Kit 2 React components
import Breadcrumbs from 'components/Breadcrumbs';
import MKBox from 'components/MKBox';
// Routes
import { useLocation } from 'react-router-dom';
import { makeBreadcrumbRoutes } from 'routes/routesTranslation';

PageBase.propTypes = {
  breadcrumb: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

PageBase.defaultProps = {
  breadcrumb: false,
};

export default function PageBase({ breadcrumb, children }) {
  const location = useLocation();
  const pathname = location.pathname;

  const breadcrumbRoutes = useMemo(() => {
    return makeBreadcrumbRoutes(pathname);
  }, [pathname]);

  return (
    <>
      {breadcrumb && (
        <MKBox width={{ xs: '100%', md: '50%', lg: '25%' }} mb={3}>
          <Breadcrumbs routes={breadcrumbRoutes} />
        </MKBox>
      )}
      <MKBox bgColor="white" shadow="sm" borderRadius="md" p={3}>
        {children}
      </MKBox>
    </>
  );
}
