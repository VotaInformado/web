import React, { useRef } from "react";

import propTypes from "prop-types";

// Components
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import MKDatePicker from "components/MKDatePicker";
// Date
import moment from "moment";

DateRangeFilter.propTypes = {
  column: propTypes.object.isRequired,
  rangeFilterIndex: propTypes.number.isRequired,
};

export default function DateRangeFilter({ column, rangeFilterIndex }) {
  const fp = useRef(null);
  const isMinFilter = rangeFilterIndex === 0;
  const currentValue = column.getFilterValue() ?? ["", ""];

  function formatValue(value) {
    const [min, max] = currentValue;
    const date = value ? moment(value).format("YYYY-MM-DD") : "";
    return isMinFilter ? [date, max] : [min, date];
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
  const maxDate = isMinFilter && currentValue?.[1] ? moment(currentValue[1]).toDate() : new Date();
  const minDate = !isMinFilter && currentValue?.[0] ? moment(currentValue[0]).toDate() : null;
  const thisFilterValue = currentValue?.[rangeFilterIndex];
  return (
    <MKDatePicker
      flatpickrRef={fp}
      input={{
        placeholder: isMinFilter ? "Desde" : "Hasta",
        size: "small",
        variant: "standard",
        value: thisFilterValue ? moment(thisFilterValue, "YYYY-MM-DD").format("D/M/YY") : "",
        InputProps: {
          endAdornment: thisFilterValue && (
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
        minDate: minDate,
        maxDate: maxDate,
        dateFormat: "d/m/y",
        onChange: (selectedDates, st, instance) => handleChange(selectedDates, st, instance),
      }}
      flatpickr={(fp) => {
        fp.current?.flatpickr?.setDate(thisFilterValue);
      }}
    />
  );
}
