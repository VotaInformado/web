import React from "react";

import propTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import VotesChart from "pages/Legislator/components/Charts/VotesChart";
import MKBadge from "components/MKBadge";
import { Grid } from "@mui/material";
import MKTypography from "components/MKTypography";

VotesCard.propTypes = {
  afirmative: propTypes.number.isRequired,
  negative: propTypes.number.isRequired,
  abstention: propTypes.number.isRequired,
  absent: propTypes.number.isRequired,
  actionLink: propTypes.string,
};

export default function VotesCard({ afirmative, negative, abstention, absent, actionLink }) {
  const goToVotes = {
    route: actionLink,
    tooltip: "Ver todas las votaciones",
    label: "Ver todas",
    icon: "arrow_forward",
    // state: {}
  };

  return (
    <CardBase title="Votaciones" action={actionLink && goToVotes} style={{ height: "100%" }}>
      <Grid container my={2} spacing={2} alignItems="center" justifyContent="center">
        <Grid container item justifyContent="center" xs={12} sm={6}>
          <MKBadge badgeContent={`Afirmativos: ${afirmative}`} color="success" container width={150} />
        </Grid>
        <Grid container item justifyContent="center" xs={12} sm={6}>
          <MKBadge badgeContent={`Negativos: ${negative}`} color="error" container width={150} />
        </Grid>
        <Grid container item justifyContent="center" xs={12} sm={6}>
          <MKBadge badgeContent={`Abstenciones: ${abstention}`} color="info" container width={150} />
        </Grid>
        <Grid container item justifyContent="center" xs={12} sm={6}>
          <MKBadge badgeContent={`Ausentes: ${absent}`} color="warning" container width={150} />
        </Grid>
        <Grid container item justifyContent="center" xs={12}>
          <MKTypography variant="body2">
            De un total de {afirmative + negative + abstention + absent} votaciones
          </MKTypography>
        </Grid>
      </Grid>

      <Grid container item justifyContent="center" alignItems="center" height={{ xs: 55, sm: 75 }}>
        <VotesChart
          data={[
            { label: "Afirmativos", value: afirmative },
            { label: "Negativos", value: negative },
            { label: "Abstenciones", value: abstention },
            { label: "Ausentes", value: absent },
          ]}
        />
      </Grid>
    </CardBase>
  );
}
