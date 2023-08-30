/* eslint-disable react/prop-types */
import React, { useState } from "react";

// Components
import PageBase from "pages/PageBase";
import ResponsiveTable from "components/Tables/ResponsiveTable";
import CardBase from "components/Cards/CardBase";
import MKInput from "components/MKInput";
import ProfileCard from "components/Cards/ProfileCard";
import MKBadge from "components/MKBadge";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Icon, Stack } from "@mui/material";
// Paths
import { Link, generatePath } from "react-router-dom";
import PATHS from "routes/paths";
// Adapters
import { getLegislators } from "adapters/legislatorSearchAdapter";

const legislatorColumns = [
  {
    header: "Nombre",
    accessorKey: "fullName",
    size: 120,
    mobileCardPosition: "title",
    enableColumnFilter: false,
    Cell: ({ cell }) => (
      <MKTypography variant="body2" fontWeight="bold">
        {cell.getValue()}
      </MKTypography>
    ),
  },
  {
    header: "Partido",
    accessorKey: "party",
    mobileCardPosition: "overline",
    size: 120,
  },
  {
    header: "Último cargo",
    accessorKey: "lastSeat",
    filterVariant: "select",
    filterSelectOptions: [
      { text: "Diputado", value: "DEPUTY" },
      { text: "Senador", value: "SENATOR" },
    ],
    mobileCardPosition: "subtitle",
    size: 70,
  },
  {
    header: "Estado",
    id: "isActive",
    accessorFn: (row) => (
      <MKBox display="flex" justifyContent="center">
        <MKBadge badgeContent={row.isActive ? "Activo" : "Inactivo"} color={row.isActive ? "success" : "error"} />
      </MKBox>
    ),
    size: 40,
  },
];

export default function LegislatorSearch() {
  const [search, setSearch] = useState("");
  return (
    <PageBase>
      <ProfileCard title="Buscar legislador" sx={{ stack: { mb: 2 } }} />
      <CardBase title="">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 2 }}
          mt={{ xs: 0, sm: 4 }}
          mb={{ xs: 2, sm: 6 }}>
          <MKInput
            placeholder="Ingrese el nombre del legislador"
            sx={{ width: { xs: "100%", md2: "65%" } }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
          displayColumnDefOptions={{ "mrt-row-actions": { size: 20, header: "Ver" } }}
          columns={legislatorColumns}
          fetchData={(params) => {
            params.globalFilter = search;
            return getLegislators(params);
          }}
          renderRowActions={({ row }) => (
            <IconButton
              component={Link}
              to={generatePath(PATHS.legislator, { id: row.original?.id ?? row.id })}
              color="primary">
              <VisibilityIcon />
            </IconButton>
          )}
        />
      </CardBase>
    </PageBase>
  );
}
