import React, { useEffect, useState } from "react";

// Components
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import LawProfileCard from "./components/Cards/LawProfileCard";
import TextCard from "components/Cards/TextCard";
import SummaryCard from "components/Cards/SummaryCard";
import CardBase from "components/Cards/CardBase";

// Adapters
import { getLaw, createLawSummary } from "adapters/lawAdapter";
// Paths and routes
import { useParams, generatePath } from "react-router-dom";
import { set } from "lodash";

export default function Law() {
  const [law, setLaw] = useState({});
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const { id } = useParams();

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
    <CardBase>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LawProfileCard law={law} />
        </Grid>

        <Grid item xs={7}>
          <Stack spacing={2}>
            <TextCard
              title="Texto"
              text={law.text ? law.text.replace(/ {2}/g, "\n\n") : "No hay información disponible"}
              link={law.link}
              sx={{ textContainer: { overflowY: "auto", maxHeight: { xs: 500, lg: 1500 } } }}
            />
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <Stack container spacing={5}>
            <Grid item>{law.summary && <TextCard title="Resumen oficial" text={law.summary} />}</Grid>
            <Grid item>
              <SummaryCard action={() => generateAISummary(law)} summary={summary} summaryLoading={summaryLoading} />
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </CardBase>
  );
}
