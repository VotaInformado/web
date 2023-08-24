import PropTypes from "prop-types";

// Components
import TableBase from "./TableBase";
import TableRowCard from "components/Cards/TableRowCard";
import { Box } from "@mui/material";

ResponsiveTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  renderRowActions: PropTypes.func,
  props: PropTypes.object,
};

export default function ResponsiveTable({ columns, data, renderRowActions, ...props }) {
  // When the screen is in xs breakpoint, the table is hidden and a list is shown instead
  const columnsByPosition = {
    title: columns.find((column) => column.position === "title"),
    subtitle: columns.find((column) => column.position === "subtitle"),
    overline: columns.find((column) => column.position === "overline"),
  };
  return (
    <>
      <Box sx={{ display: { xs: "none", md1: "block" } }}>
        <TableBase
          columns={columns}
          data={data}
          // muiTableProps={{
          //   sx: {
          //     overflowX: "auto",
          //   },
          // }}
          {...props}
        />
      </Box>
      <Box sx={{ display: { xs: "flex", md1: "none" }, flexWrap: "wrap", gap: 2, width: "100%" }}>
        {data.slice(0, 10).map((row, index) => (
          <TableRowCard
            key={index}
            title={row[columnsByPosition.title?.accessorKey]}
            subtitle={row[columnsByPosition.subtitle?.accessorKey]}
            overline={row[columnsByPosition.overline?.accessorKey]}
            action={props?.renderRowActions({ row })}
          />
        ))}
      </Box>
    </>
  );
}
