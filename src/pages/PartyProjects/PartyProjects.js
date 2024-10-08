import React, { useEffect, useState } from "react";

// Components
import PageBase from "pages/PageBase";
import PartyProfileCard from "pages/Party/components/Cards/PartyProfileCard";
import ProjectsCard from "pages/Party/components/Cards/ProjectsCard";
import ResponsiveTable from "components/Tables/ResponsiveTable";
import MKTypography from "components/MKTypography";
import CollapsableTypography from "components/Collapsables/CollapsableTypography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import ProjectStatusStepper from "components/Steppers/ProjectStatusStepper";
import LinearProgress from "@mui/material/LinearProgress";
import DateRangeFilter from "components/Tables/FilterComponents/DateRangeFilter";
import NoData from "components/NoData";
import { toast } from "react-toastify";
// Adapters
import { getParty } from "adapters/partyAdapter";
import { getPartyProjects } from "adapters/partyProjectsAdapter";
// Routes
import { useParams, useNavigate, generatePath, Link as RouterLink } from "react-router-dom";
import PATHS from "routes/paths";

const partyProjectColumns = [
  {
    header: "Proyecto",
    id: "title",
    mobileCardPosition: "title",
    enableColumnFilter: false,
    accessorFn: (row) => (
      <CollapsableTypography maxLines={2} variant="body2">
        {row.id ? (
          <Link component={RouterLink} underline="hover" to={generatePath(PATHS.project, { id: row.id })}>
            {row.title}
          </Link>
        ) : (
          row.title
        )}
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
        {row.status ? <ProjectStatusStepper status={row.status} showLabels={false} /> : <NoData />}
      </Stack>
    ),
    size: 60,
  },
];

export default function PartyProjects() {
  const [party, setParty] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getParty(id)
      .then((res) => setParty(res))
      .catch(() => {
        toast.error("Ocurrió un error al obtener el partido");
        navigate(-1);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const getProjectsData = (params) => {
    return getPartyProjects(id, params).catch((err) => {
      console.log(err);
      toast.error("Ocurrió un error al obtener los proyectos del partido");
      navigate(-1);
    });
  };

  return (
    <PageBase>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <Grid container alignItems="center" rowSpacing={5}>
            <Grid item xs={12} lg={7}>
              <PartyProfileCard party={party} />
            </Grid>
            <Grid item xs={12} lg={5}>
              {/* PREDECIR */}
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2} alignItems="flex-start">
            <Grid item xs={12} lg={4} spacing={2}>
              <ProjectsCard partyId={id} />
            </Grid>
            <Grid item xs={12} lg={8} spacing={2}>
              <ResponsiveTable
                enableRowActions={false}
                columns={partyProjectColumns}
                fetchData={getProjectsData}
                pageSize={15}
                enableSearch
              />
            </Grid>
          </Grid>
        </>
      )}
    </PageBase>
  );
}
