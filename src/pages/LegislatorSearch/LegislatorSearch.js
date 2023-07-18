/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

// Components
import PageBase from "pages/PageBase";
import TableBase from "components/Tables/TableBase";
import CardBase from "components/Cards/CardBase";
import MKInput from "components/MKInput";
import ProfileCard from "components/Cards/ProfileCard";
import MKBadge from "components/MKBadge";
import MKBox from "components/MKBox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Icon, Stack } from "@mui/material";
// Paths
import { Link, generatePath } from "react-router-dom";
import PATHS from "routes/paths";
// Adapters
import { getLegislators } from "adapters/legislatorSearchAdapter";
import MKTypography from "components/MKTypography";

const legislatorColumns = [
  {
    header: "Nombre",
    accessorKey: "full_name",
    size: 120,
    Cell: ({ cell }) => (
      <MKTypography variant="body2" fontWeight="bold" sx={{ color: "secondary.main" }} textTransform="capitalize" >
        {cell.getValue().toLowerCase()}
      </MKTypography>
    ),
  },
  {
    header: "Partido",
    accessorKey: "party",
    size: 120,
  },
  {
    header: "Último cargo",
    accessorKey: "lastSeat",
    size: 70,
  },
  {
    header: "Estado",
    id: "is_active",
    accessorFn: (row) => (
      <MKBox display="flex" justifyContent="center">
        <MKBadge badgeContent={row.is_active ? "Activo" : "Inactivo"} color={row.is_active ? "success" : "error"} />
      </MKBox>
    ),
    size: 40,
  },
];

export default function LegislatorSearch() {
  const [legislators, setLegislators] = useState([]);

  useEffect(() => {
    getLegislators().then((res) => {
      setLegislators(res);
    });
  }, []);

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
            InputProps={{
              endAdornment: (
                <IconButton color="primary">
                  <Icon fontSize="medium">search_icon</Icon>
                </IconButton>
              ),
            }}
          />
        </Stack>
        <TableBase
          enableRowActions
          displayColumnDefOptions={{ "mrt-row-actions": { size: 20, header: "Ver" } }}
          renderRowActions={({ row }) => (
            <IconButton component={Link} to={generatePath(PATHS.legislator, { id: row.id })} color="primary">
              <VisibilityIcon />
            </IconButton>
          )}
          columns={legislatorColumns}
          data={legislators}
        />
      </CardBase>
    </PageBase>
  );
}
