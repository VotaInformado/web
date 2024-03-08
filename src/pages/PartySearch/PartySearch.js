import React, { useState, useMemo } from "react";

// Components
import PageBase from "pages/PageBase";
import ResponsiveTable from "components/Tables/ResponsiveTable";
import CardBase from "components/Cards/CardBase";
import MKInput from "components/MKInput";
import ProfileCard from "components/Cards/ProfileCard";
import MKTypography from "components/MKTypography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Icon, Stack } from "@mui/material";
import CollapsableChips from "components/Collapsables/CollapsableChips";
import { toast } from "react-toastify";
// Paths
import { Link, generatePath, useNavigate } from "react-router-dom";
import PATHS from "routes/paths";
// Adapters
import { getParties } from "adapters/partySearchAdapter";
// Utils
import useDebouncedValue from "utils/useDebounceValue";

const partyColumns = [
  {
    header: "Nombre",
    accessorKey: "name",
    size: 120,
    mobileCardPosition: "title",
    enableColumnFilter: false,
    accessorFn: (row) => (
      <MKTypography variant="body2" fontWeight="bold">
        {row.name}
      </MKTypography>
    ),
  },
  {
    header: "Partidos en bloque",
    accessorKey: "subParties",
    mobileCardPosition: "extraContent",
    enableColumnFilter: false,
    size: 120,
    accessorFn: (row) => <CollapsableChips maxLines={3} variant="body2" values={row.subParties} />,
  },
];

export default function PartySearch() {
  const [search, setSearch] = useState("");
  const navigation = useNavigate();

  const debouncedSearch = useDebouncedValue(search, 500);

  function getPartiesData(params) {
    params.globalFilter = search;
    return getParties(params).catch((err) => {
      console.log(err);
      toast.error("Ocurrió un error al obtener los partidos");
      navigation(PATHS.home);
    });
  }

  const memoizedResponsiveTable = useMemo(
    () => (
      <ResponsiveTable
        enableRowActions
        enableColumnFilters={false}
        displayColumnDefOptions={{ "mrt-row-actions": { size: 20, header: "Ver" } }}
        columns={partyColumns}
        fetchData={getPartiesData}
        renderRowActions={({ row }) => (
          <IconButton
            component={Link}
            to={generatePath(PATHS.party, { id: row.original?.id ?? row.id })}
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
      <ProfileCard title="Buscar partido" sx={{ stack: { mb: 2 } }} />
      <CardBase title="">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 2 }}
          mt={{ xs: 0, sm: 4 }}
          mb={{ xs: 2, sm: 6 }}>
          <MKInput
            placeholder="Ingrese el nombre del partido"
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
