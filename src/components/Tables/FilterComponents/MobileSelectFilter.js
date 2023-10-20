import React from "react";

import PropTypes from "prop-types";
// Components
import MKInput from "components/MKInput";
import MenuItem from "@mui/material/MenuItem";

MobileSelectFilter.propTypes = {
  column: PropTypes.shape({
    header: PropTypes.string.isRequired,
    filterSelectOptions: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
      })
    ),
  }).isRequired,
  filterValue: PropTypes.string,
  setFilter: PropTypes.func.isRequired,
};

export default function MobileSelectFilter({ column, filterValue, setFilter }) {
  function handleChange(e) {
    setFilter(e.target.value || undefined);
  }

  return (
    <MKInput select label={column.header} value={filterValue} onChange={handleChange} sx={{ width: "100%" }}>
      <MenuItem value={""}>&nbsp;</MenuItem>
      {column.filterSelectOptions?.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.text}
        </MenuItem>
      ))}
    </MKInput>
  );
}
