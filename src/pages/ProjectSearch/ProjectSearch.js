/* eslint-disable react/prop-types */
import React from "react";

// Components
import PageBase from "pages/PageBase";
import ResponsiveTable from "components/Tables/ResponsiveTable";
import CardBase from "components/Cards/CardBase";
import MKInput from "components/MKInput";
import ProfileCard from "components/Cards/ProfileCard";
import MKTypography from "components/MKTypography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Icon, Stack } from "@mui/material";
import ProjectStatusStepper from "./components/ProjectStatusStepper";
// Paths
import { Link, generatePath } from "react-router-dom";
import PATHS from "routes/paths";
// Adapters
import { getProjects } from "adapters/projectSearchAdapter";

const projectColumns = [
  {
    header: "Título",
    accessorKey: "title",
    size: 180,
    mobileCardPosition: "title",
    // Cell: ({ cell }) => (
    //   <MKTypography variant="body2" textTransform="capitalize">
    //     {cell.getValue().toLowerCase()}
    //   </MKTypography>
    // ),
  },
  {
    header: "Publicación",
    accessorKey: "publicationDate",
    mobileCardPosition: "overline",
    size: 50,
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
    accessorFn: (row) => (
      <Stack justifyContent="center" alignContent="center" spacing={2}>
        {row.status && <ProjectStatusStepper status={row.status} />}
        <MKTypography variant="body2" align="center">
          {row.status || "Sin estado"}
        </MKTypography>
      </Stack>
    ),
    size: 60,
  },
];

export default function ProjectSearch() {
  return (
    <PageBase>
      <ProfileCard title="Buscar proyecto" sx={{ stack: { mb: 2 } }} />
      <CardBase title="">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 2 }}
          mt={{ xs: 0, sm: 4 }}
          mb={{ xs: 2, sm: 6 }}>
          <MKInput
            placeholder="Ingrese el nombre del proyecto"
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
            <IconButton
              component={Link}
              to={generatePath(PATHS.project, { id: row.original?.id ?? row.id })}
              color="primary">
              <VisibilityIcon />
            </IconButton>
          )}
          columns={projectColumns}
          fetchData={getProjects}
        />
      </CardBase>
    </PageBase>
  );
}
