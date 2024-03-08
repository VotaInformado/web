import React from "react";

// Router
import { Link } from "react-router-dom";
import PATHS from "routes/paths";
// Components
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import { Stack } from "@mui/material";
import PageBase from "pages/PageBase";

export default function NotFound() {
  return (
    <PageBase>
      <Stack justifyContent="center" alignItems="center" spacing={4} my={10}>
        <MKTypography variant="h5" mb={2}>
          No se encontró la página especificada
        </MKTypography>
        <Link to={PATHS.home}>
          <MKButton component="button" variant="contained" color="primary">
            Volver al inicio
          </MKButton>
        </Link>
      </Stack>
    </PageBase>
  );
}
