import React, { useState, useEffect } from "react";

import PageBase from "pages/PageBase";
import ProfileCard from "components/Cards/ProfileCard";
import CardBase from "components/Cards/CardBase";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import MKTypography from "components/MKTypography";
import MKBadge from "components/MKBadge";
import Disclaimer from "pages/Prediction/Components/Disclaimer";
import ChamberResult from "./Components/ChamberResult";
import Link from "@mui/material/Link";
// Theme
import { voteColor } from "assets/theme/base/colorsMapping";
// Utils
import { translateVote } from "utils/translate";
import { toast } from "react-toastify";
// Router
import { useSearchParams, Link as RouterLink, generatePath, useNavigate } from "react-router-dom";
// Adapters
import { predictLegislatorVote, predictChamberVote } from "adapters/predictionAdapter";
import { getLegislator } from "adapters/legislatorAdapter";
import { getProject } from "adapters/projectAdapter";
import PATHS from "routes/paths";

export default function PredictionResult() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [legislator, setLegislator] = useState(null);
  const [project, setProject] = useState(null);

  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const legislatorId = params.get("legislador");
  const projectId = params.get("proyecto");
  const chamber = params.get("camara");

  if (!projectId || (!legislatorId && !chamber)) {
    toast.error("No se encontró el proyecto o el legislador");
    navigate(PATHS.prediction);
  }

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
    if (!legislatorId || !projectId || !project || !legislator || chamber) return;
    setLoading(true);
    predictLegislatorVote(legislatorId, projectId)
      .then((res) => {
        setResult(res);
      })
      .catch((err) => {
        toast.error("Ocurrió un error al obtener la predicción");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [project, legislator]);

  useEffect(() => {
    if (!chamber || !projectId || !project) return;
    setLoading(true);
    predictChamberVote(chamber, projectId)
      .then((res) => {
        setResult(res);
      })
      .catch((err) => {
        toast.error("Ocurrió un error al obtener la predicción");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [project, chamber]);

  function showResults() {
    if (chamber) {
      return <ChamberResult senatorsVotes={result.senatorsVotes} deputiesVotes={result.deputiesVotes} />;
    } else {
      return (
        <Stack spacing={4} alignItems="center">
          <MKBadge
            badgeContent={translateVote(result.vote)}
            color={voteColor[translateVote(result.vote)?.toLowerCase()]}
            container
            width={150}
          />
        </Stack>
      );
    }
  }

  function showText() {
    switch (chamber) {
      case "diputados":
        return "Predicción de los votos para la Cámara de Diputados";
      case "senadores":
        return "Predicción de los votos para la Cámara de Senadores";
      case "ambas":
        return "Predicción de los votos para las Cámaras de Diputados y Senadores";
      default:
        return `Predicción del voto del legislador ${legislator?.fullName}`;
    }
  }

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
                {showText()}
              </MKTypography>
              <MKTypography variant="body2" textAlign="center">
                en el proyecto
              </MKTypography>
              <MKTypography variant="body2" textAlign="center" sx={{ fontStyle: "italic" }}>
                <Link
                  component={RouterLink}
                  underline="hover"
                  target="_blank"
                  to={generatePath(PATHS.project, { id: projectId })}>
                  {project?.title}
                </Link>
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
              showResults()
            )}
            <Disclaimer />
          </Stack>
        </CardBase>
      </Stack>
    </PageBase>
  );
}
