import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import MKBox from "components/MKBox";
import Stack from "@mui/material/Stack";
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
    <MKBox sx={{ minHeight: 100, ...sx?.textContainer }}>
      <MKTypography variant="body2" sx={{ whiteSpace: "pre-line", ...sx?.typography }}>
        {summary}
      </MKTypography>
    </MKBox>
  );
};

const cardWithSummaryLoading = () => {
  const [showMessage, setShowMessage] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack sx={{ minHeight: 100 }} alignItems="center" justifyContent="center">
      <MKTypography variant="body2" sx={{ whiteSpace: "pre-line" }}>
        <span>
          Generando resumen... <CircularProgress size={20} style={{ marginLeft: 8 }} />
        </span>
      </MKTypography>
      {showMessage && (
        <MKTypography variant="body2" align="center" sx={{ whiteSpace: "pre-line", fontStyle: "italic" }}>
          Por favor, espere unos segundos mas...
        </MKTypography>
      )}
    </Stack>
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
