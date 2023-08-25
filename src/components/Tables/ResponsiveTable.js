import PropTypes from "prop-types";

// Components
import TableBase from "./TableBase";
import MobileCard from "components/Cards/MobileCard";
import Icon from "@mui/material/Icon";
import MKBox from "components/MKBox";
import MKPagination from "components/MKPagination";

ResponsiveTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  renderRowActions: PropTypes.func,
  props: PropTypes.object,
};

export default function ResponsiveTable({ columns, data, renderRowActions, ...props }) {
  const columnsByPosition = {
    title: columns.find((column) => column.mobileCardPosition === "title"),
    subtitle: columns.find((column) => column.mobileCardPosition === "subtitle"),
    overline: columns.find((column) => column.mobileCardPosition === "overline"),
  };

  function colKey(column) {
    if (!column) return;
    return column.accessorKey || column.id;
  }
  return (
    <>
      <MKBox sx={{ display: { xs: "none", md1: "block" } }}>
        <TableBase columns={columns} data={data} renderRowActions={renderRowActions} {...props} />
      </MKBox>
      <MKBox
        sx={{
          display: { xs: "flex", md1: "none" },
          flexWrap: "wrap",
          gap: 2,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}>
        {data.slice(0, 10).map((row, index) => (
          <MobileCard
            key={row.id || index}
            title={row[colKey(columnsByPosition.title)]}
            subtitle={row[colKey(columnsByPosition.subtitle)]}
            overline={row[colKey(columnsByPosition.overline)]}
            action={renderRowActions({ row })}
          />
        ))}
        <MKPagination color="primary" variant="contained">
          <MKPagination item>
            <Icon>keyboard_arrow_left</Icon>
          </MKPagination>
          <MKPagination item active>
            1
          </MKPagination>
          <MKPagination item>2</MKPagination>
          <MKPagination item>3</MKPagination>
          <MKPagination item>
            <Icon>keyboard_arrow_right</Icon>
          </MKPagination>
        </MKPagination>
      </MKBox>
    </>
  );
}
