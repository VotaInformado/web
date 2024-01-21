import React, { useEffect, useState } from "react";

import propTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import ParliamentChart from "components/Charts/ParliamentChart/ParliamentChart";
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";
import Grid from "@mui/material/Grid";

// Utils and theme
import moment from "moment";
import formatParliamentChartData from "components/Charts/ParliamentChart/formatParliamentChartData";

ParliamentVotesCard.propTypes = {
  house: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  afirmative: propTypes.number.isRequired,
  negative: propTypes.number.isRequired,
  abstention: propTypes.number.isRequired,
  absent: propTypes.number.isRequired,
  actionLink: propTypes.string,
  actionState: propTypes.object,
};

export default function ParliamentVotesCard({
  house,
  date,
  afirmative,
  negative,
  abstention,
  absent,
  actionLink,
  actionState,
}) {
  const [chartData, setChartData] = useState([]);

  const goToVotes = {
    route: actionLink,
    state: actionState || {},
    tooltip: "Ver detalle",
    label: "Ver detalle",
    icon: "arrow_forward",
  };

  useEffect(() => {
    setChartData(formatParliamentChartData(afirmative, abstention, negative, absent));
  }, [afirmative, negative, abstention, absent]);

  return (
    <CardBase title={`Votación ${house}`} action={actionLink && goToVotes}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {date && (
          <Grid container item justifyContent="center" xs={12}>
            <MKTypography variant="body2">Fecha de votación: {moment(date).format("DD/MM/YYYY")}</MKTypography>
          </Grid>
        )}
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

      <MKBox width="100%" mt={-2}>
        <ParliamentChart seriesName="Votos" data={chartData} />
      </MKBox>
    </CardBase>
  );
}
