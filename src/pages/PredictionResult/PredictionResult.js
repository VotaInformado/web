import React, { useState, useEffect } from "react";

import PageBase from "pages/PageBase";
import ProfileCard from "components/Cards/ProfileCard";
import CardBase from "components/Cards/CardBase";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import MKTypography from "components/MKTypography";
import MKBadge from "components/MKBadge";
import Disclaimer from "pages/Prediction/Components/Disclaimer";
// Theme
import { voteColor } from "assets/theme/base/colorsMapping";
// Utils
import { translateVote } from "utils/translate";
// Router
import { useSearchParams } from "react-router-dom";
// Adapters
import { predict } from "adapters/predictionAdapter";
import { getLegislator } from "adapters/legislatorAdapter";
import { getProject } from "adapters/projectAdapter";

export default function PredictionResult() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [legislator, setLegislator] = useState(null);
  const [project, setProject] = useState(null);
  const [params, setParams] = useSearchParams();

  const legislatorId = params.get("legislador");
  const projectId = params.get("proyecto");

  useEffect(() => {
    if (!legislatorId) return;
    getLegislator(legislatorId).then((res) => {
      setLegislator(res);
    });
  }, [legislatorId]);

  useEffect(() => {
    if (!projectId) return;
    getProject(projectId).then((res) => {
      setProject(res);
    });
  }, [projectId]);

  useEffect(() => {
    if (!legislatorId || !projectId || !project || !legislator) return;
    setLoading(true);
    predict(legislatorId, projectId)
      .then((res) => {
        setResult(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [project, legislator]);

  return (
    <PageBase>
      <ProfileCard title="Predecir Votación" sx={{ stack: { mb: 2 } }} />
      <Stack justifyContent="center" direction="row">
        <CardBase title="" sx={{ width: { xs: "100%", lg: "66%" } }}>
          <MKTypography variant="h6" fontWeight="bold">
            Resultado
          </MKTypography>
          <Stack alignItems="center" spacing={4}>
            <div>
              <MKTypography variant="body2" textAlign="center">
                Predicción del voto del legislador {legislator?.fullName}
              </MKTypography>
              <MKTypography variant="body2" textAlign="center">
                en el proyecto
              </MKTypography>
              <MKTypography variant="body2" sx={{ fontStyle: "italic" }} textAlign="center">
                {project?.title}
              </MKTypography>
            </div>
            {loading ? (
              <Stack sx={{ width: "100%" }}>
                <LinearProgress sx={{ width: "100%" }} />
                <MKTypography variant="caption" textAlign="center">
                  Esto puede tardar unos segundos...
                </MKTypography>
              </Stack>
            ) : (
              <Stack spacing={4} alignItems="center">
                <MKBadge
                  badgeContent={translateVote(result.vote)}
                  color={voteColor[translateVote(result.vote)?.toLowerCase()]}
                  container
                  width={150}
                />
              </Stack>
            )}
            <Disclaimer />
          </Stack>
        </CardBase>
      </Stack>
    </PageBase>
  );
}
