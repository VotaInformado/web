import React, { useState, useMemo } from "react";

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
import { Grid, IconButton, Icon, Stack } from "@mui/material";
import { toast } from "react-toastify";

// Paths
import { Link, generatePath, useNavigate } from "react-router-dom";
import PATHS from "routes/paths";
// Adapters
import { getLegislators } from "adapters/legislatorSearchAdapter";
// Utils
import useDebouncedValue from "utils/useDebounceValue";

const DEFAULT_PROFILE_IMAGE_URL =
  "https://t3.ftcdn.net/jpg/05/71/08/24/360_F_571082432_Qq45LQGlZsuby0ZGbrd79aUTSQikgcgc.jpg";

const legislatorColumns = [
  {
    header: "Legislador",
    accessorKey: "fullName",
    size: 120,
    mobileCardPosition: "title",
    enableColumnFilter: false,
    accessorFn: (row) => (
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item>
          <MKBox
            component="img"
            sx={{
              height: 40,
              width: 40,
              marginTop: 0.5,
            }}
            alt={row.fullName}
            src={row.pictureUrl || DEFAULT_PROFILE_IMAGE_URL}
          />
        </Grid>
        <Grid item>
          <Link relative="path" to={`/legislador/${row.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <MKTypography variant="body2" fontWeight="bold">
              {row.fullName}
            </MKTypography>
          </Link>
        </Grid>
      </Grid>
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
    filterVariant: "select",
    filterSelectOptions: [
      { text: "Activo", value: true },
      { text: "Inactivo", value: false },
    ],
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
  const navigation = useNavigate();

  const debouncedSearch = useDebouncedValue(search, 500);

  function getLegislatorsData(params) {
    params.globalFilter = search;
    return getLegislators(params).catch((err) => {
      console.log(err);
      toast.error("Ocurrió un error al obtener los legisladores");
      navigation(PATHS.home);
    });
  }

  const memoizedResponsiveTable = useMemo(
    () => (
      <ResponsiveTable
        enableRowActions={false}
        displayColumnDefOptions={{ "mrt-row-actions": { size: 20, header: "Ver" } }}
        columns={legislatorColumns}
        fetchData={getLegislatorsData}
        renderRowActions={({ row }) => (
          <IconButton
            component={Link}
            to={generatePath(PATHS.legislator, { id: row.original?.id ?? row.id })}
            color="primary">
            <VisibilityIcon />
          </IconButton>
        )}
        sx={{ backgroundColor: "background.default" }}
      />
    ),
    [debouncedSearch]
  );

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
        {memoizedResponsiveTable}
      </CardBase>
    </PageBase>
  );
}
