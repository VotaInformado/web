import React, { useEffect, useState } from "react";

// Components
import PageBase from "pages/PageBase";
import PartyProfileCard from "pages/Party/components/Cards/PartyProfileCard";
import VotesCard from "pages/Party/components/Cards/VotesCard";
import VotesChart from "./Charts/VotesChart";
import ResponsiveTable from "components/Tables/ResponsiveTable";
import MKTypography from "components/MKTypography";
import CollapsableTypography from "components/Collapsables/CollapsableTypography";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import NoData from "components/NoData";
import { toast } from "react-toastify";
import DateRangeFilter from "components/Tables/FilterComponents/DateRangeFilter";
// Adapters
import { getParty } from "adapters/partyAdapter";
import { getPartyVotes } from "adapters/partyVotesAdapter";
// Routes
import { useParams, useNavigate, generatePath, Link as RouterLink } from "react-router-dom";
import PATHS from "routes/paths";

const partyVoteColumns = [
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
    header: "Fecha",
    id: "date",
    mobileCardPosition: "overline",
    size: 90,
    minSize: 90,
    filterVariant: "range",
    filterFn: "between",
    Filter: DateRangeFilter,
    accessorFn: (row) =>
      row.date ? (
        <MKTypography variant="body2" sx={{ fontStyle: !row.lastSeat && "italic" }}>
          {row.date}
        </MKTypography>
      ) : (
        <NoData />
      ),
  },
  {
    header: "Votos",
    id: "votes",
    minSize: 100,
    mobileCardPosition: "subtitle",
    enableColumnFilter: false,
    enableSorting: false,
    accessorFn: (row) => (
      <MKBox display="flex" justifyContent="center">
        <VotesChart
          afirmativos={row.afirmativos}
          negativos={row.negativos}
          abstenciones={row.abstenciones}
          ausentes={row.ausentes}
        />
      </MKBox>
    ),
    size: 40,
  },
];

export default function PartyVotes() {
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

  const getVotesData = (params) => {
    return getPartyVotes(id, params).catch((err) => {
      console.log(err);
      toast.error("Ocurrió un error al obtener los votos del partido");
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
            <Grid item xs={12} lg={4} spacing={2} sx={{ display: { xs: "none", sm: "block" } }}>
              <VotesCard partyId={id} />
            </Grid>
            <Grid item xs={12} lg={8} spacing={2}>
              <ResponsiveTable
                enableRowActions={false}
                columns={partyVoteColumns}
                fetchData={getVotesData}
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
