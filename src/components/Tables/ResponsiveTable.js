import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Utils
import { cloneDeep, get } from "lodash";
// Components
import TableBase from "./TableBase";
import MobileCard from "components/Cards/MobileCard";
import MKBox from "components/MKBox";
import MobilePagination from "./MobilePagination";
import LinearProgress from "@mui/material/LinearProgress";

const INITIAL_PAGE_SIZE = 25;

ResponsiveTable.propTypes = {
  fetchData: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  renderRowActions: PropTypes.func,
  pageSize: PropTypes.number,
  density: PropTypes.oneOf(["comfortable", "compact", "spacious"]),
  enableSearch: PropTypes.bool,
  props: PropTypes.object,
};

ResponsiveTable.defaultProps = {
  pageSize: INITIAL_PAGE_SIZE,
  enableSearch: false,
  density: "comfortable",
};

export default function ResponsiveTable({
  fetchData,
  pageSize,
  columns,
  renderRowActions,
  enableSearch,
  density,
  ...props
}) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!fetchData) return;
    setIsLoading(true);
    window.scrollTo(0, 0);
    // Clone to avoid mutating
    const fetchOptions = cloneDeep({ pagination, columnFilters, sorting, globalFilter });
    fetchData(fetchOptions)
      .then((response) => {
        setTotalRows(response.totalRows);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pagination.pageIndex, pagination.pageSize, columnFilters, globalFilter, sorting, fetchData]);

  const columnsByPosition = {
    title: columns.find((column) => column.mobileCardPosition === "title"),
    subtitle: columns.find((column) => column.mobileCardPosition === "subtitle"),
    overline: columns.find((column) => column.mobileCardPosition === "overline"),
    extraContent: columns.find((column) => column.mobileCardPosition === "extraContent"),
  };

  function colKey(column) {
    if (!column) return;
    return column.accessorKey || column.id;
  }

  function getValue(row, column) {
    const key = colKey(column);
    if (!key) return;
    if (column.accessorFn) {
      return column.accessorFn(row);
    }
    return get(row, key);
  }

  return (
    <>
      <MKBox sx={{ display: { xs: "none", md1: "block" } }}>
        <TableBase
          columns={columns}
          data={data}
          renderRowActions={renderRowActions}
          enableGlobalFilter={enableSearch}
          manualPagination
          manualFiltering
          manualSorting
          onPaginationChange={setPagination}
          onColumnFiltersChange={setColumnFilters}
          onGlobalFilterChange={setGlobalFilter}
          onSortingChange={setSorting}
          rowCount={totalRows}
          state={{
            isLoading,
            pagination,
            columnFilters,
            globalFilter,
            sorting,
            density: density,
          }}
          {...props}
        />
      </MKBox>
      {isLoading ? (
        <LinearProgress sx={{ overflow: "hidden" }} />
      ) : (
        <MKBox
          sx={{
            display: { xs: "flex", md1: "none" },
            flexWrap: "wrap",
            gap: 2,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          {data?.map((row, index) => (
            <MobileCard
              key={row.id || index}
              title={getValue(row, columnsByPosition.title)}
              subtitle={getValue(row, columnsByPosition.subtitle)}
              overline={getValue(row, columnsByPosition.overline)}
              extraContent={getValue(row, columnsByPosition.extraContent)} // {columnsByPosition.extraContent?.accessorFn?.(row)}
              action={renderRowActions && renderRowActions({ row })}
            />
          ))}
          <MobilePagination
            pageIndex={pagination.pageIndex}
            pageSize={pagination.pageSize}
            totalRows={totalRows}
            onPageChange={(page) => setPagination({ ...pagination, pageIndex: page })}
          />
        </MKBox>
      )}
    </>
  );
}
