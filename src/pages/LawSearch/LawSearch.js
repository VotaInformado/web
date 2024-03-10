import React from "react";

// Components
import PageBase from "pages/PageBase";
import ResponsiveTable from "components/Tables/ResponsiveTable";
import CardBase from "components/Cards/CardBase";
import MKInput from "components/MKInput";
import ProfileCard from "components/Cards/ProfileCard";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Icon, Stack } from "@mui/material";
import { toast } from "react-toastify";
import DateRangeFilter from "components/Tables/FilterComponents/DateRangeFilter";
// Router
import { Link, generatePath, useNavigate } from "react-router-dom";
import PATHS from "routes/paths";
// Adapters
import { getLaws } from "adapters/lawSearchAdapter";
// Utils
import useDebouncedValue from "utils/useDebounceValue";

const lawColumns = [
  {
    header: "Número",
    accessorKey: "law_number",
    mobileCardPosition: "subtitle",
    size: 70,
  },
  {
    header: "Título",
    accessorKey: "title",
    enableColumnFilter: false,
    size: 180,
    mobileCardPosition: "title",
    // accessorFn: (row) => (
    //   <CollapsableTypography maxLines={3} variant="body2">
    //     {row.title}
    //   </CollapsableTypography>
    // ),
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
];

export default function LawSearch() {
  const [search, setSearch] = React.useState("");
  const navigation = useNavigate();

  const debouncedSearch = useDebouncedValue(search, 500);

  function getLawsData(params) {
    params.globalFilter = search;
    return getLaws(params).catch((err) => {
      console.log(err);
      toast.error("Ocurrió un error al obtener las leyes");
      navigation(PATHS.home);
    });
  }

  const memoizedResponsiveTable = React.useMemo(
    () => (
      <ResponsiveTable
        enableRowActions
        displayColumnDefOptions={{ "mrt-row-actions": { size: 10, header: "Ver" } }}
        renderRowActions={({ row }) => (
          <IconButton component={Link} to={generatePath(PATHS.law, { id: row.original?.id ?? row.id })} color="primary">
            <VisibilityIcon />
          </IconButton>
        )}
        columns={lawColumns}
        fetchData={getLawsData}
        sx={{ backgroundColor: "background.default" }}
      />
    ),
    [debouncedSearch]
  );

  return (
    <PageBase>
      <ProfileCard title="Buscar leyes" sx={{ stack: { mb: 2 } }} />
      <CardBase title="">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 2 }}
          mt={{ xs: 0, sm: 4 }}
          mb={{ xs: 2, sm: 6 }}>
          <MKInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ingrese el título de la ley"
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
        {memoizedResponsiveTable}
      </CardBase>
    </PageBase>
  );
}
