import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

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
  props: PropTypes.object,
};

export default function ResponsiveTable({ fetchData, pageSize, columns, renderRowActions, ...props }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize || INITIAL_PAGE_SIZE,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    fetchData(pagination.pageIndex, pagination.pageSize)
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
  }, [pagination.pageIndex, pagination.pageSize, fetchData]);

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

  return (
    <>
      <MKBox sx={{ display: { xs: "none", md1: "block" } }}>
        <TableBase
          columns={columns}
          data={data}
          renderRowActions={renderRowActions}
          manualPagination
          onPaginationChange={setPagination}
          rowCount={totalRows}
          state={{
            pagination,
            isLoading,
            pagination,
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
              title={row[colKey(columnsByPosition.title)]}
              subtitle={row[colKey(columnsByPosition.subtitle)]}
              overline={row[colKey(columnsByPosition.overline)]}
              extraContent={columnsByPosition.extraContent?.accessorFn?.(row)}
              action={renderRowActions({ row })}
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
