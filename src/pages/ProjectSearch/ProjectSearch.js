import React from "react";

// Components
import PageBase from "pages/PageBase";
import ResponsiveTable from "components/Tables/ResponsiveTable";
import CardBase from "components/Cards/CardBase";
import MKInput from "components/MKInput";
import ProfileCard from "components/Cards/ProfileCard";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import CollapsableTypography from "components/CollapsableTypography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Icon, Stack } from "@mui/material";
import ProjectStatusStepper from "components/Steppers/ProjectStatusStepper";
import { toast } from "react-toastify";
import DateRangeFilter from "components/Tables/FilterComponents/DateRangeFilter";
// Router
import { generatePath, useNavigate, useSearchParams, Link } from "react-router-dom";
import PATHS from "routes/paths";
// Adapters
import { getProjects } from "adapters/projectSearchAdapter";
// Utils
import { makePath, updateSearchParams } from "utils/pathGeneration";

const projectColumns = [
  {
    header: "Título",
    accessorKey: "title",
    enableColumnFilter: false,
    size: 180,
    mobileCardPosition: "title",
    accessorFn: (row) => (
      <CollapsableTypography maxLines={3} variant="body2">
        {row.title}
      </CollapsableTypography>
    ),
  },
  {
    header: "Publicación",
    accessorKey: "publicationDate",
    filterVariant: "range",
    filterFn: "between",
    mobileCardPosition: "overline",
    size: 80,
    Filter: DateRangeFilter,
  },
  {
    header: "Presentado por",
    accessorKey: "authorParty",
    mobileCardPosition: "subtitle",
    size: 70,
  },
  {
    header: "Estado",
    id: "status",
    filterVariant: "select",
    filterSelectOptions: [
      { text: "Cámara de origen", value: "ORIGIN_CHAMBER_COMISSION,ORIGIN_CHAMBER_SENTENCE" },
      { text: "Cámara revisora", value: "HALF_SANCTION,REVISION_CHAMBER_COMISSION,REVISION_CHAMBER_SENTENCE" },
      { text: "Aprobado", value: "APPROVED" },
      { text: "Rechazado", value: "REJECTED" },
      { text: "Retirado", value: "WITHDRAWN" },
    ],
    mobileCardPosition: "extraContent",
    accessorFn: (row) => (
      <Stack justifyContent="center" alignContent="center" spacing={2}>
        {row.status && <ProjectStatusStepper status={row.status} showLabels={false} />}
        <MKTypography variant="body2" align="center">
          {row.status || "Sin estado"}
        </MKTypography>
      </Stack>
    ),
    size: 60,
  },
];

export default function ProjectSearch() {
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const isPredicting = params.get("prediccion") === "true";

  function getProjectsData(params) {
    params.globalFilter = search;
    return getProjects(params).catch((err) => {
      console.log(err);
      toast.error("Ocurrió un error al obtener los proyectos");
      navigate(PATHS.home);
    });
  }
  return (
    <PageBase>
      <ProfileCard title="Buscar proyecto" sx={{ stack: { mb: 2 } }} />
      <CardBase title="">
        {isPredicting && (
          <Stack direction="row" alignItems="flex-start" mb={2}>
            <MKTypography variant="body2" textAlign="left">
              Para predecir podes utilizar el botón
              <IconButton color="primary" sx={{ margin: 0, paddingY: 0 }}>
                <Icon fontSize="medium">arrow_circle_right</Icon>
              </IconButton>
              ubicado en la columna &quot;Ver&quot;. O bien, podés hacer click para ver el proyecto (
              <IconButton color="primary" sx={{ margin: 0, paddingY: 0 }}>
                <Icon fontSize="medium">visibility</Icon>
              </IconButton>
              ) y luego en el botón
              <MKButton variant="contained" size="small" color="primary" sx={{ ml: 1 }}>
                Predecir votos
              </MKButton>
            </MKTypography>
            <MKTypography variant="body2" textAlign="left"></MKTypography>
          </Stack>
        )}
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 2 }}
          mt={{ xs: 0, sm: 4 }}
          mb={{ xs: 2, sm: 6 }}>
          <MKInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ingrese el título del proyecto"
            sx={{ width: { xs: "100%", md2: "65%" } }}
            InputProps={{
              endAdornment: (
                <IconButton color="primary">
                  <Icon fontSize="medium">search_icon</Icon>
                </IconButton>
              ),
            }}
          />
        </Stack>
        <ResponsiveTable
          enableRowActions
          displayColumnDefOptions={{ "mrt-row-actions": { size: 10, header: "Ver" } }}
          renderRowActions={({ row }) => (
            <Stack direction="row" spacing={-1}>
              <IconButton
                component={Link}
                to={makePath(PATHS.project, { params: { id: row.original?.id ?? row.id } })}
                color="primary">
                <VisibilityIcon />
              </IconButton>
              {isPredicting && (
                <IconButton
                  component={Link}
                  to={makePath(PATHS.prediction, { searchParams: { proyecto: row.original?.id ?? row.id } })}
                  color="primary">
                  <Icon fontSize="medium">arrow_circle_right</Icon>
                </IconButton>
              )}
            </Stack>
          )}
          columns={projectColumns}
          fetchData={getProjectsData}
          sx={{ backgroundColor: "background.default" }}
        />
      </CardBase>
    </PageBase>
  );
}
