import React, { useMemo } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

// Material Kit 2 React components
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import CenteredFooter from "components/Footers/CenteredFooter";
import MKBox from "components/MKBox";
import useMediaQuery from "@mui/material/useMediaQuery";
// Routes
import { Outlet } from "react-router-dom";
import navbarRoutes from "routes/navbarRoutes";

export default function BaseLayout() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <MKBox display="flex" flexDirection="column" variant="gradient" bgColor="light" minHeight="100vh">
      <MKBox bgColor="white" shadow="sm" py={0.25}>
        <DefaultNavbar routes={navbarRoutes} action={false} transparent relative center />
      </MKBox>
      <Container disableGutters={isSmallScreen}>
        <Grid
          flexDirection="column"
          justifyContent="center"
          sx={{
            // p: 2,
            // mx: { xs: 2, lg: 3 },
            my: { xs: 0, sm: 5 },
          }}>
          <Outlet />
        </Grid>
      </Container>
      <MKBox mt="auto">
        <CenteredFooter />
      </MKBox>
    </MKBox>
  );
}
