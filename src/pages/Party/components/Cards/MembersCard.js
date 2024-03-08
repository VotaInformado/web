import React from "react";

import propTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import MapChart from "components/Charts/MapChart/MapChart";
import { Stack } from "@mui/material";

LegislatorsCard.propTypes = {
  totalLegislators: propTypes.number.isRequired,
  countryRepresentation: propTypes.object,
  actionLink: propTypes.string,
};

export default function LegislatorsCard({ totalLegislators, countryRepresentation, actionLink }) {
  const mapData = Object.entries(countryRepresentation || {})?.map((entry) => {
    const [province, values] = entry;
    return {
      name: province,
      value: values.total_members,
      label: values.province_name,
    };
  });

  const goToMembers = {
    route: actionLink,
    tooltip: "Ver todos los legisladores",
    label: "Ver todos",
    icon: "arrow_forward",
  };

  return (
    <CardBase title="Legisladores" action={actionLink && goToMembers}>
      <Stack direction="column" spacing={2} alignItems="center">
        <MKBox mb={5}>
          <MKTypography variant="body2">Total de legisladores: {totalLegislators}</MKTypography>
        </MKBox>
        <MKTypography variant="body2" fontWeight="medium" color="primary" align="center">
          Legisladores históricos por provincia
        </MKTypography>
        <MKBox width="100%">
          <MapChart data={mapData} />
        </MKBox>
      </Stack>
    </CardBase>
  );
}
