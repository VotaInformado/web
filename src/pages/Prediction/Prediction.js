import React, { useState, useEffect } from "react";

import PageBase from "pages/PageBase";
import ProfileCard from "components/Cards/ProfileCard";
import CardBase from "components/Cards/CardBase";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MKTypography from "components/MKTypography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Disclaimer from "./Components/Disclaimer";
import Link from "@mui/material/Link";
// Router
import { Link as RouterLink, generatePath, useNavigate } from "react-router-dom";
import PATHS from "routes/paths";
// Utils
import useDebouncedValue from "utils/useDebounceValue";
// Adapters
import { getProjects } from "adapters/projectSearchAdapter";
import { getLegislators } from "adapters/legislatorSearchAdapter";
import MKButton from "components/MKButton";

const PREDICT_LEGISLATOR = "legislator";
const PREDICT_CHAMBER = "chamber";

export default function Prediction() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [projectSearch, setProjectSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [legislators, setLegislators] = useState([]);
  const [legislatorSearch, setLegislatorSearch] = useState("");
  const [selectedLegislator, setSelectedLegislator] = useState(null);
  const [loading, setLoading] = useState(false);

  const [predictionType, setPredictionType] = useState(PREDICT_LEGISLATOR);

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

  function predictLegislatorVote() {
    if (!selectedLegislator || !selectedProject) {
      return;
    }
    navigate(PATHS.predictionResult + "?legislador=" + selectedLegislator.id + "&proyecto=" + selectedProject.id);
  }
  return (
    <PageBase>
      <ProfileCard title="Predecir Votación" sx={{ stack: { mb: 2 } }} />
      <Stack justifyContent="center" direction="row">
        <CardBase title="" sx={{ width: { xs: "100%", lg: "66%" } }}>
          <Stack spacing={4}>
            <div>
              <Autocomplete
                options={projects}
                value={selectedProject}
                onChange={(e, newValue) => {
                  setSelectedProject(newValue);
                }}
                inputValue={projectSearch}
                onInputChange={(e, newInputValue) => {
                  setProjectSearch(newInputValue);
                }}
                filterOptions={(x) => x}
                noOptionsText={debouncedProjectSearch ? "No se encontraron proyectos" : "Ingrese un nombre para buscar"}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Proyecto de ley"
                    placeholder="Ingrese el nombre del proyecto"
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
              <MKTypography variant="caption" sx={{ ml: 1 }}>
                <Link component={RouterLink} underline="always" to={`${PATHS.projectSearch}?prediccion=true`}>
                  Búsqueda Avanzada
                </Link>
              </MKTypography>
            </div>

            <FormControl component="fieldset">
              {/* <FormLabel component="legend">¿Qué tipo de predicción desea realizar?</FormLabel> */}
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
                <Autocomplete
                  options={legislators}
                  value={selectedLegislator}
                  onChange={(e, newValue) => {
                    setSelectedLegislator(newValue);
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
                <MKButton variant="contained" color="primary" component={Link} to="/buscar/partido">
                  Predecir para la cámara de Senadores
                </MKButton>
                <MKButton variant="contained" color="primary" component={Link} to="/buscar/partido">
                  Predecir para la cámara de Diputados
                </MKButton>
                <MKButton variant="contained" color="primary" component={Link} to="/buscar/partido">
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
