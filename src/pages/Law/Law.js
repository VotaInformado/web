import React, { useEffect, useState } from "react";

// Components
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import LawProfileCard from "./components/Cards/LawProfileCard";
import TextCard from "components/Cards/TextCard";
import SummaryCard from "components/Cards/SummaryCard";
import PageBase from "pages/PageBase";
import MKButton from "components/MKButton";
// Theme
import useMediaQuery from "@mui/material/useMediaQuery";
// Adapters
import { getLaw, createLawSummary } from "adapters/lawAdapter";
// Paths and routes
import { useParams, generatePath, Link } from "react-router-dom";
import PATHS from "routes/paths";

export default function Law() {
  const [law, setLaw] = useState({});
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const { id } = useParams();

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  useEffect(() => {
    setLoading(true);
    getLaw(id)
      .then((res) => {
        setLaw(res);
        setSummary(res.ai_generated_summary);
      })
      .finally(() => setLoading(false));
  }, []);

  const generateAISummary = (law) => {
    setSummaryLoading(true);
    createLawSummary(law.id).then((res) => {
      setSummary(res);
      setSummaryLoading(false);
    });
  };

  return (
    <PageBase>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <Grid container alignItems="center" padding={2} spacing={2}>
            <Grid item xs={12} lg={7}>
              <LawProfileCard law={law} />
            </Grid>
            <Grid item xs={12} lg={5}>
              {law.associated_project && (
                <Box display="flex" justifyContent="center">
                  <MKButton
                    component={Link}
                    to={generatePath(PATHS.project, { id: law.associated_project?.id })}
                    color="primary"
                    size="small"
                    fullWidth={isSmallScreen}
                    sx={{ mt: 1 }}>
                    Ver proyecto asociado
                  </MKButton>
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={12} lg={7}>
              <TextCard
                title="Texto"
                text={law.text?.replace(/ {2}/g, "\n\n")}
                link={law.link}
                sx={{ textContainer: { overflowY: "auto", maxHeight: { xs: 300, lg: 1500 } } }}
              />
            </Grid>
            <Grid container item xs={12} lg={5} spacing={2}>
              <Grid item>
                {law.summary && (
                  <TextCard
                    title="Resumen oficial"
                    text={law.summary}
                    sx={{ textContainer: { overflowY: "auto", maxHeight: { xs: 300, lg: 750 } } }}
                  />
                )}
              </Grid>
              <Grid item>
                <SummaryCard
                  action={() => generateAISummary(law)}
                  summary={summary}
                  summaryLoading={summaryLoading}
                  sx={{ textContainer: { overflowY: "auto", maxHeight: { xs: 300, lg: 750 } } }}
                />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </PageBase>
  );
}
