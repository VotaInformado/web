import PropTypes from "prop-types";

import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";

TableBase.propTypes = {
  props: PropTypes.object,
};

export default function TableBase({ ...props }) {
  return (
    <MaterialReactTable
      enableHiding={false}
      enableDensityToggle={false}
      enableFullScreenToggle={false}
      enableColumnResizing
      localization={MRT_Localization_ES}
      {...props}
      muiTableBodyCellProps={{
        sx: {
          color: "text.main",
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          color: "text.main",
        },
      }}
      muiTableFooterCellProps={{
        sx: {
          color: "text.main",
        },
      }}
      muiTablePaginationProps={{
        sx: {
          color: "text.main",
        },
      }}
    />
  );
}
