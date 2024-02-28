import React from "react";

import PropTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Button from "@mui/material/Button";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CircularProgress from "@mui/material/CircularProgress";

SummaryCard.propTypes = {
  summary: PropTypes.string,
  action: PropTypes.func,
  summaryLoading: PropTypes.bool,
  sx: PropTypes.shape({
    textContainer: PropTypes.object,
    typography: PropTypes.object,
  }),
};

const cardWithSummary = (summary, sx) => {
  return (
    <MKBox sx={{ minHeight: 100, ...sx.textContainer }}>
      <MKTypography variant="body2" sx={{ whiteSpace: "pre-line", ...sx.typography }}>
        {summary}
      </MKTypography>
    </MKBox>
  );
};

const cardWithSummaryLoading = () => {
  return (
    <MKBox sx={{ minHeight: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <MKTypography variant="body2" sx={{ whiteSpace: "pre-line" }}>
        <span>
          Generando resumen... <CircularProgress size={20} style={{ marginLeft: 8 }} />
        </span>
      </MKTypography>
    </MKBox>
  );
};

const cardWithoutSummary = (action, summaryLoading) => {
  if (summaryLoading) {
    return cardWithSummaryLoading();
  }
  return (
    <MKBox sx={{ minHeight: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Button variant="outlined" onClick={action} startIcon={<SmartToyIcon />} style={{ color: "black" }}>
        Generá el resumen
      </Button>
    </MKBox>
  );
};

export default function SummaryCard({ summary, action, summaryLoading, sx }) {
  return (
    <CardBase title={"Resumen (generado por IA)"}>
      {summary ? cardWithSummary(summary, sx) : cardWithoutSummary(action, summaryLoading)}
    </CardBase>
  );
}
