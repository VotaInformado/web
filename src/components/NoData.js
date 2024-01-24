import React from "react";

// Components
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import ToolTip, { tooltipClasses } from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import MKTypography from "components/MKTypography";
// Router
import { Link as RouterLink } from "react-router-dom";

const FORM_URL = process.env.REACT_APP_FORM_URI;

export default function NoData() {
  console.log("FORM URL", FORM_URL);
  function tooltipContent() {
    return (
      <MKTypography variant="body2">
        No tenemos datos para mostrar en este momento. Si conocés donde podríamos obtenerlos, por favor,{" "}
        <Link component={RouterLink} to={FORM_URL} target="_blank" underline="always" color="primary">
          completá este formulario
        </Link>
      </MKTypography>
    );
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <MKTypography variant="body2" sx={{ fontStyle: "italic" }}>
        Sin datos
      </MKTypography>
      <ToolTip
        title={tooltipContent()}
        slotProps={{
          tooltip: {
            sx: {
              backgroundColor: "white.main",
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
              [`& .${tooltipClasses.arrow}`]: {
                color: "white.main",
              },
            },
          },
        }}>
        <Icon color="secondary">help_outline_outline_icon</Icon>
      </ToolTip>
    </Stack>
  );
}
