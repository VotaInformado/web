import React, { useState } from "react";

import PropTypes from "prop-types";

// Components
import MKInput from "components/MKInput";
import { IconButton, Icon } from "@mui/material";

export default function MobileSearchFilter({ filterValue, setFilter }) {
  const [value, setValue] = useState(filterValue || "");
  return (
    <MKInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Buscar..."
      sx={{ width: "100%" }}
      InputProps={{
        endAdornment: (
          <>
            {value && (
              <IconButton
                color="primary"
                onClick={() => {
                  setValue("");
                  setFilter("");
                }}>
                <Icon fontSize="medium">clear_icon</Icon>
              </IconButton>
            )}
            <IconButton color="primary" onClick={() => setFilter(value)}>
              <Icon fontSize="medium">search_icon</Icon>
            </IconButton>
          </>
        ),
      }}
    />
  )

}