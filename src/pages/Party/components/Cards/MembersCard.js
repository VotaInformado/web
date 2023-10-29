import React from "react";

import propTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import PieChart from "components/Charts/PieChart/PieChart";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import MapChart from "components/Charts/MapChart/MapChart";
import { Stack } from "@mui/material";

MembersCard.propTypes = {
  totalMembers: propTypes.number.isRequired,
  countryRepresentation: propTypes.object,
};

export default function MembersCard({ totalMembers, countryRepresentation }) {
  const mapData = Object.entries(countryRepresentation || {})?.map((entry) => {
    const [province, values] = entry;
    return {
      name: province,
      value: values.total_members,
      label: values.province_name,
    };
  });

  return (
    <CardBase title="Miembros">
      <Stack direction="column" spacing={2} alignItems="center">
        <MKBox mb={5}>
          <MKTypography variant="body2" color="textSecondary">
            Total de miembros: {totalMembers}
          </MKTypography>
        </MKBox>
        <MKTypography variant="body2" fontWeight="medium" color="primary">
          Miembros históricos por provincia
        </MKTypography>
        <MKBox width="100%">
          <MapChart data={mapData} />
        </MKBox>
      </Stack>
    </CardBase>
  );
}
