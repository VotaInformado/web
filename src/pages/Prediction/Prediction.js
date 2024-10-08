import React, { useState, useEffect } from "react";

import PageBase from "pages/PageBase";
import ProfileCard from "components/Cards/ProfileCard";
import CardBase from "components/Cards/CardBase";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import MKTypography from "components/MKTypography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Disclaimer from "./Components/Disclaimer";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
// Router
import { Link as RouterLink, useSearchParams, generatePath, useNavigate } from "react-router-dom";
import PATHS from "routes/paths";
// Utils
import useDebouncedValue from "utils/useDebounceValue";
import { updateSearchParams } from "utils/pathGeneration";
// Adapters
import { getProjects } from "adapters/projectSearchAdapter";
import { getLegislators } from "adapters/legislatorSearchAdapter";
import { getProject } from "adapters/projectAdapter";
import { getLegislator } from "adapters/legislatorAdapter";
import MKButton from "components/MKButton";

const PREDICT_LEGISLATOR = "legislator";
const PREDICT_CHAMBER = "chamber";

export default function Prediction() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const [projects, setProjects] = useState([]);
  const [projectSearch, setProjectSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [legislators, setLegislators] = useState([]);
  const [legislatorSearch, setLegislatorSearch] = useState("");
  const [selectedLegislator, setSelectedLegislator] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictionType, setPredictionType] = useState(PREDICT_LEGISLATOR);

  const legislatorId = params.get("legislador");
  const projectId = params.get("proyecto");

  const debouncedProjectSearch = useDebouncedValue(projectSearch, 500);
  const debouncedLegislatorSearch = useDebouncedValue(legislatorSearch, 500);

  useEffect(() => {
    if (!debouncedProjectSearch) {
      setProjects([]);
      return;
    }
    setLoading(true);
    const params = {
      pagination: { pageIndex: 0, pageSize: 10 },
      globalFilter: debouncedProjectSearch,
    };
    getProjects(params)
      .then((res) => {
        setProjects(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedProjectSearch]);

  useEffect(() => {
    if (!debouncedLegislatorSearch) {
      setLegislators([]);
      return;
    }
    setLoading(true);
    const params = {
      pagination: { pageIndex: 0, pageSize: 10 },
      globalFilter: debouncedLegislatorSearch,
    };
    getLegislators(params)
      .then((res) => {
        setLegislators(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedLegislatorSearch]);

  useEffect(() => {
    if (!legislatorId) return;
    getLegislator(legislatorId).then((res) => {
      setSelectedLegislator(res);
    });
  }, [legislatorId]);

  useEffect(() => {
    if (!projectId) return;
    getProject(projectId).then((res) => {
      setSelectedProject(res);
    });
  }, [projectId]);

  function predictLegislatorVote() {
    if (!selectedLegislator || !selectedProject) {
      return;
    }
    navigate(PATHS.predictionResult + "?legislador=" + selectedLegislator.id + "&proyecto=" + selectedProject.id);
  }

  function predictChamberVote(chamber) {
    if (!selectedProject) {
      return;
    }
    return navigate(PATHS.predictionResult + "?camara=" + chamber + "&proyecto=" + selectedProject.id);
  }

  return (
    <PageBase>
      <ProfileCard title="Predecir Votación" sx={{ stack: { mb: 2 } }} />
      <Stack justifyContent="center" direction="row">
        <CardBase title="" sx={{ width: { xs: "100%", lg: "66%" } }}>
          <Stack spacing={4}>
            <MKTypography variant="body2" textAlign="center">
              Realizá una predicción sobre cómo se votaría un Proyecto de Ley. Buscá el proyecto que quieras y elegí si
              predecir para un legislador o para una cámara del Congreso.
            </MKTypography>
            <MKTypography variant="body2" textAlign="center">
              Proyecto seleccionado:{" "}
              <MKTypography sx={{ fontStyle: "italic" }}>
                {projectId ? (
                  <Link
                    component={RouterLink}
                    underline="hover"
                    target="_blank"
                    to={generatePath(PATHS.project, { id: projectId })}>
                    {selectedProject?.title}
                  </Link>
                ) : (
                  "Ninguno"
                )}
              </MKTypography>
            </MKTypography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <MKButton
                sx={{ width: "50%" }}
                variant="outlined"
                color="secondary"
                component={RouterLink}
                to={`${PATHS.projectSearch}?` + updateSearchParams({ prediccion: true })}>
                {selectedProject ? "Cambiar proyecto" : "Buscar proyecto"}
              </MKButton>
            </Box>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="prediction-type"
                name="row-radio-buttons-group"
                value={predictionType}
                onChange={(e) => setPredictionType(e.target.value)}
                sx={{ justifyContent: "center" }}>
                <FormControlLabel value={PREDICT_LEGISLATOR} control={<Radio />} label="Para un legislador" />
                <FormControlLabel value={PREDICT_CHAMBER} control={<Radio />} label="Para una cámara del Congreso" />
              </RadioGroup>
            </FormControl>
            {predictionType === PREDICT_LEGISLATOR && (
              <>
                <MKTypography variant="body2" textAlign="center">
                  Busque el legislador para el cual quiere predecir el voto:
                </MKTypography>
                <Autocomplete
                  options={legislators}
                  value={selectedLegislator}
                  onChange={(e, newValue) => {
                    setSelectedLegislator(newValue);
                    setParams(updateSearchParams({ legislador: newValue?.id }));
                  }}
                  inputValue={legislatorSearch}
                  onInputChange={(e, newInputValue) => {
                    setLegislatorSearch(newInputValue);
                  }}
                  filterOptions={(x) => x}
                  noOptionsText={
                    debouncedLegislatorSearch ? "No se encontraron legisladores" : "Ingrese un nombre para buscar"
                  }
                  getOptionLabel={(option) => option.fullName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Legislador"
                      placeholder="Ingrese el nombre del legislador"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
                <MKButton variant="contained" color="primary" onClick={predictLegislatorVote}>
                  Predecir voto
                </MKButton>
              </>
            )}
            {predictionType === PREDICT_CHAMBER && (
              <Stack direction={{ xs: "column", md2: "row" }} spacing={2}>
                <MKButton variant="contained" color="primary" onClick={() => predictChamberVote("senadores")}>
                  Predecir para la cámara de Senadores
                </MKButton>
                <MKButton variant="contained" color="primary" onClick={() => predictChamberVote("diputados")}>
                  Predecir para la cámara de Diputados
                </MKButton>
                <MKButton variant="contained" color="primary" onClick={() => predictChamberVote("ambas")}>
                  Predecir para ambas cámaras
                </MKButton>
              </Stack>
            )}
            <Disclaimer />
          </Stack>
        </CardBase>
      </Stack>
    </PageBase>
  );
}
