import React from "react";

import PropTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import MKBox from "components/MKBox";
import MobileSearchFilter from "./FilterComponents/MobileSearchFilter";
import MobileSelectFilter from "./FilterComponents/MobileSelectFilter";

// Utils
import { cloneDeep } from "lodash";

MobileFilterBox.propTypes = {
  columns: PropTypes.array.isRequired,
  columnFilters: PropTypes.array.isRequired,
  setColumnFilters: PropTypes.func.isRequired,
  globalFilter: PropTypes.string.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
  enableSearch: PropTypes.bool,
};

export default function MobileFilterBox({
  columns,
  columnFilters,
  setColumnFilters,
  globalFilter,
  setGlobalFilter,
  enableSearch,
}) {
  const columnsWithSelectFilter = columns.filter((column) => column.filterVariant === "select");
  const showFilters = columnsWithSelectFilter.length > 0 || enableSearch;

  function setFilter(column, filterValue) {
    setColumnFilters((prev) => {
      const newFilters = cloneDeep(prev);
      const filter = newFilters.find((filter) => filter.id === column.id);
      if (filter && !filterValue) {
        newFilters.splice(newFilters.indexOf(filter), 1);
      } else if (filter) {
        filter.value = filterValue;
      } else {
        newFilters.push({ id: column.id, value: filterValue });
      }
      return newFilters;
    });
  }

  return (
    showFilters && (
      <CardBase sx={{ width: "100%" }}>
        {enableSearch && <MobileSearchFilter filterValue={globalFilter} setFilter={setGlobalFilter} />}
        {columnsWithSelectFilter?.map((column) => (
          <MKBox key={column.id} mt={1}>
            <MobileSelectFilter
              column={column}
              filterValue={columnFilters.find((filter) => filter.id === column.id)?.value}
              setFilter={(filterValue) => setFilter(column, filterValue)}
            />
          </MKBox>
        ))}
      </CardBase>
    )
  );
}
