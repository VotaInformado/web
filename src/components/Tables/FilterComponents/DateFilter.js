import React, { useRef } from "react";

import propTypes from "prop-types";

// Components
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import MKDatePicker from "components/MKDatePicker";
// Date
import moment from "moment";

DateFilter.propTypes = {
  column: propTypes.object.isRequired,
};

export default function DateFilter({ column }) {
  const fp = useRef(null);
  const currentValue = column.getFilterValue();

  function formatValue(value) {
    const date = value ? moment(value).format("YYYY-MM-DD") : "";
    return date;
  }

  function setValue(value) {
    value = formatValue(value);
    column.setFilterValue(value);
  }

  function handleChange(selectedDates, str, instance) {
    let value;
    if (selectedDates.length > 0) {
      value = selectedDates[0];
    }
    setValue(value);
  }
  return (
    <MKDatePicker
      flatpickrRef={fp}
      input={{
        placeholder: "Fecha",
        size: "small",
        variant: "standard",
        value: currentValue ? moment(currentValue, "YYYY-MM-DD").format("D/M/YY") : "",
        InputProps: {
          endAdornment: currentValue && (
            <IconButton
              color="grey.500"
              sx={{ p: 0 }}
              onClick={() => {
                setValue(null);
                fp?.current?.flatpickr.clear();
              }}>
              <Icon fontSize="small">clear_icon</Icon>
            </IconButton>
          ),
        },
      }}
      options={{
        maxDate: new Date(),
        dateFormat: "d/m/y",
        onChange: (selectedDates, st, instance) => handleChange(selectedDates, st, instance),
      }}
      flatpickr={(fp) => {
        fp.current?.flatpickr?.setDate(currentValue);
      }}
    />
  );
}
