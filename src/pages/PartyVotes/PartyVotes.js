import React, { useEffect, useState } from "react";

// Components
import PageBase from "pages/PageBase";
import PartyProfileCard from "pages/Party/components/Cards/PartyProfileCard";
import VotesCard from "pages/Party/components/Cards/VotesCard";
import VotesChart from "./Charts/VotesChart";
import ResponsiveTable from "components/Tables/ResponsiveTable";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { toast } from "react-toastify";
// Adapters
import { getParty } from "adapters/partyAdapter";
import { getPartyVotes } from "adapters/partyVotesAdapter";
// Routes
import { useParams, useNavigate } from "react-router-dom";

const partyVoteColumns = [
  {
    header: "Proyecto",
    id: "title",
    mobileCardPosition: "title",
    enableColumnFilter: false,
    accessorFn: (row) => (
      <MKTypography variant="body2" fontWeight="bold">
        {row.title}
      </MKTypography>
    ),
  },
  {
    header: "Fecha",
    id: "date",
    mobileCardPosition: "overline",
    size: 90,
    minSize: 90,
    enableColumnFilter: false,
    accessorFn: (row) => (
      <MKTypography variant="body2" sx={{ fontStyle: !row.lastSeat && "italic" }}>
        {row.date || "Sin datos"}
      </MKTypography>
    ),
  },
  {
    header: "Votos",
    id: "votes",
    minSize: 100,
    mobileCardPosition: "subtitle",
    enableColumnFilter: false,
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
            <Grid container item xs={12} lg={4} spacing={2} sx={{ display: { xs: "none", sm: "block" } }}>
              <Grid item xs={12}>
                <VotesCard partyId={id} />
              </Grid>
            </Grid>
            <Grid container item xs={12} lg={8} spacing={2}>
              <Grid item xs={12}>
                <ResponsiveTable
                  enableRowActions={false}
                  columns={partyVoteColumns}
                  fetchData={getVotesData}
                  density={"compact"}
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
