import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";

import borders from "assets/theme/base/borders";

TableBase.propTypes = {
  sx: PropTypes.object,
  props: PropTypes.object,
};

TableBase.defaultProps = {
  sx: {
    backgroundColor: "background.paper",
  },
};

export default function TableBase({ sx, ...props }) {
  const { borderRadius } = borders;
  return (
    <MaterialReactTable
      enableHiding={false}
      enableDensityToggle={false}
      enableFullScreenToggle={false}
      enableColumnResizing
      localization={MRT_Localization_ES}
      {...props}
      // Customize styles
      muiTableBodyCellProps={{
        sx: {
          color: "text.main",
          backgroundColor: sx.backgroundColor,
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          color: "text.main",
          backgroundColor: sx.backgroundColor,
        },
      }}
      muiTableFooterCellProps={{
        sx: {
          color: "text.main",
          backgroundColor: sx.backgroundColor,
        },
      }}
      muiTablePaginationProps={{
        sx: {
          color: "text.main",
          backgroundColor: sx.backgroundColor,
        },
      }}
      muiTopToolbarProps={{
        sx: {
          backgroundColor: sx.backgroundColor,
          borderRadius: borderRadius.xl,
        },
      }}
      muiBottomToolbarProps={{
        sx: {
          backgroundColor: sx.backgroundColor,
          borderRadius: borderRadius.xl,
        },
      }}
    />
  );
}
