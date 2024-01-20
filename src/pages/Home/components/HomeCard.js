import React from "react";

import PropTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import MKButton from "components/MKButton";
import Stack from "@mui/material/Stack";

HomeCard.propTypes = {
  image: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  children: PropTypes.node,
};

export default function HomeCard({ image, buttonText, buttonLink, children }) {
  return (
    <CardBase>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        spacing={4}
        sx={{ height: { xs: "350px", md1: "350px", lg: "400px" } }}>
        <Stack justifyContent="center" alignItems="center" sx={{ width: { xs: "25%", md2: "30%" } }}>
          <img src={image} style={{ width: "100%", height: "auto" }} />
        </Stack>
        <Stack justifyContent="center" alignItems="center">
          {children}
        </Stack>
        <Stack justifyContent="center" alignItems="center">
          <MKButton variant="gradient" color="primary" href={buttonLink} size="large">
            {buttonText}
          </MKButton>
        </Stack>
      </Stack>
    </CardBase>
  );
}
