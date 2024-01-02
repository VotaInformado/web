import React, { useEffect, useState } from "react";

// Components
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import PageBase from "pages/PageBase";
import LegislatorProfileCard from "pages/Legislator/components/Cards/LegislatorProfileCard";
import ProjectsCard from "pages/Legislator/components/Cards/ProjectsCard";
import ResponsiveTable from "components/Tables/ResponsiveTable";
import MKTypography from "components/MKTypography";
import ProjectStatusStepper from "components/Steppers/ProjectStatusStepper";
import MKBadge from "components/MKBadge";
import MKBox from "components/MKBox";
import DateRangeFilter from "components/Tables/FilterComponents/DateRangeFilter";
import { IconButton, Icon, Stack } from "@mui/material";

import CollapsableTypography from "components/CollapsableTypography";
import { toast } from "react-toastify";
// Adapters
import { getLegislator } from "adapters/legislatorAdapter";
import { getLegislatorProjects } from "adapters/legislatorProjectsAdapter";
// Routes
import { useParams, useNavigate } from "react-router-dom";

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

export default function LegislatorProjects() {
  const [legislator, setLegislator] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getLegislator(id)
      .then((res) => setLegislator(res))
      .finally(() => setLoading(false));
  }, [id]);

  const getProjectsData = (params) => {
    return getLegislatorProjects(id, params).catch((err) => {
      console.log(err);
      toast.error("Ocurrió un error al obtener los votos");
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
              <LegislatorProfileCard legislator={legislator} />
            </Grid>
            <Grid item xs={12} lg={5}>
              {/* PREDECIR */}
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2} alignItems="flex-start">
            <Grid container item xs={12} lg={4} spacing={2}>
              <Grid item xs={12}>
                <ProjectsCard
                  approved={legislator.projects?.filter((project) => project.status === "APPROVED")?.length}
                  pending={legislator.projects?.filter((project) => project.status !== "APPROVED")?.length}
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} lg={8} spacing={2}>
              <Grid item xs={12}>
                <ResponsiveTable
                  enableRowActions={false}
                  columns={projectColumns}
                  fetchData={getProjectsData}
                  // density={"compact"}
                  pageSize={15}
                  enableSearch
                />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </PageBase>
  );
}
