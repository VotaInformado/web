import React, { useEffect, useState } from "react";

// Components
import PageBase from "pages/PageBase";
import PartyProfileCard from "pages/Party/components/Cards/PartyProfileCard";
import LegislatorsCard from "pages/Party/components/Cards/MembersCard";
import ResponsiveTable from "components/Tables/ResponsiveTable";
import MKTypography from "components/MKTypography";
import MKBadge from "components/MKBadge";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LinearProgress from "@mui/material/LinearProgress";
import NoData from "components/NoData";
import { toast } from "react-toastify";
// Adapters
import { getParty } from "adapters/partyAdapter";
import { getPartyLegislators } from "adapters/partyLegislatorsAdapter";
// Routes
import { useParams, useNavigate, Link as RouterLink, generatePath } from "react-router-dom";
import PATHS from "routes/paths";

const partyLegislatorColumns = [
  {
    header: "Nombre",
    accessorKey: "fullName",
    size: 120,
    mobileCardPosition: "title",
    enableColumnFilter: false,
    accessorFn: (row) =>
      row.id && (
        <Link component={RouterLink} underline="hover" to={generatePath(PATHS.legislator, { id: row.id })}>
          {row.fullName}
        </Link>
      ),
  },
  {
    header: "Último cargo",
    accessorKey: "lastSeat",
    filterVariant: "select",
    filterSelectOptions: [
      { text: "Diputado/a", value: "DEPUTY" },
      { text: "Senador/a", value: "SENATOR" },
    ],
    mobileCardPosition: "subtitle",
    size: 70,
    accessorFn: (row) =>
      row.lastSeat ? (
        <MKTypography variant="body2" sx={{ fontStyle: !row.lastSeat && "italic" }}>
          {row.lastSeat}
        </MKTypography>
      ) : (
        <NoData />
      ),
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

export default function PartyLegislators() {
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
      })
      .finally(() => setLoading(false));
  }, [id]);

  const getLegislatorsData = (params) => {
    return getPartyLegislators(id, params).catch((err) => {
      console.log(err);
      toast.error("Ocurrió un error al obtener los legisladores del partido");
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
              <LegislatorsCard
                totalLegislators={party.totalLegislators}
                countryRepresentation={party.countryRepresentation}
              />
            </Grid>
            <Grid item xs={12} lg={8} spacing={2}>
              <ResponsiveTable
                enableRowActions={false}
                columns={partyLegislatorColumns}
                fetchData={getLegislatorsData}
                density={"compact"}
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
