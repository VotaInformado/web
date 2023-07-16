import React, { useEffect, useState } from "react";

import propTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import ParliamentChart from "components/Charts/ParliamentChart/ParliamentChart";
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import { Grid } from "@mui/material";

// Utils and theme
import { voteColor } from "assets/theme/base/colorsMapping";

function formatData(afirmative, abstention, negative, absent) {
  return [
    {
      name: "Afirmativos",
      y: afirmative,
      color: voteColor["afirmativos"],
    },
    {
      name: "Abstenciones",
      y: abstention,
      color: voteColor["abstenciones"],
    },
    {
      name: "Negativos",
      y: negative,
      color: voteColor["negativos"],
    },
    {
      name: "Ausentes",
      y: absent,
      color: voteColor["ausentes"],
    },
  ];
}

VotesCard.propTypes = {
  house: propTypes.string.isRequired,
  afirmative: propTypes.number.isRequired,
  negative: propTypes.number.isRequired,
  abstention: propTypes.number.isRequired,
  absent: propTypes.number.isRequired,
};

export default function VotesCard({ house, afirmative, negative, abstention, absent }) {
  const [chartData, setChartData] = useState([]);

  const goToVotes = {
    route: "/votes",
    tooltip: "Ver detalle",
    label: "Ver detalle",
    icon: "arrow_forward",
    // state: {}
  };

  useEffect(() => {
    setChartData(formatData(afirmative, abstention, negative, absent));
  }, [afirmative, negative, abstention, absent]);

  return (
    <CardBase title={`Votación ${house}`} action={goToVotes}>
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
      </Grid>

      <MKBox width="100%" mt={-5}>
        <ParliamentChart seriesName="Votos" data={chartData} />
      </MKBox>
    </CardBase>
  );
}
