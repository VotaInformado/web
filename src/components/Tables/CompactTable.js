import React from "react";

import PropTypes from "prop-types";

// Components
import TableBase from "components/Tables/TableBase";

CompactTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default function CompactTable({ columns, data }) {
  return (
    <TableBase
      enableColumnActions={false}
      enableColumnFilters={false}
      enableTopToolbar={false}
      initialState={{
        pagination: { pageIndex: 0, pageSize: 5 },
        density: "compact",
      }}
      muiTablePaginationProps={{
        rowsPerPageOptions: [5, 10, 20],
      }}
      muiTableBodyCellProps={{
        sx: {
          whiteSpace: "normal",
        },
      }}
      columns={columns}
      data={data}
    />
  );
}
