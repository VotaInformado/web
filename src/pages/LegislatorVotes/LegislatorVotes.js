import React, { useEffect, useState } from "react";

// Components
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import PageBase from "pages/PageBase";
import LegislatorProfileCard from "pages/Legislator/components/Cards/LegislatorProfileCard";
import VotesCard from "../Legislator/components/Cards/VotesCard";
import ResponsiveTable from "components/Tables/ResponsiveTable";
import MKBadge from "components/MKBadge";
import MKBox from "components/MKBox";
import DateFilter from "components/Tables/FilterComponents/DateFilter";
import CollapsableTypography from "components/Collapsables/CollapsableTypography";
import Link from "@mui/material/Link";
import NoData from "components/NoData";
import { toast } from "react-toastify";
// Adapters
import { getLegislator } from "adapters/legislatorAdapter";
import { getLegislatorVotes } from "adapters/legislatorVotesAdapter";
// Theme
import { voteColor } from "assets/theme/base/colorsMapping";
// Routes
import { useParams, useNavigate, Link as RouterLink, generatePath } from "react-router-dom";
import PATHS from "routes/paths";

const renderProjectTitle = (row) => {
  if (!row.project?.title) return <NoData />;
  const title = row.project?.id ? (
    <Link component={RouterLink} underline="hover" to={generatePath(PATHS.project, { id: row.project?.id })}>
      {row.project?.title}
    </Link>
  ) : (
    `${row.project?.title}`
  );
  return (
    <CollapsableTypography maxLines={2} variant="body2" fontWeight="bold">
      {title}
    </CollapsableTypography>
  );
};

const votingsColumns = [
  {
    header: "Fecha",
    accessorKey: "date",
    size: 45,
    Filter: DateFilter,
    mobileCardPosition: "overline",
  },
  {
    header: "Proyecto",
    accessorKey: "project.title",
    size: 140,
    mobileCardPosition: "title",
    accessorFn: renderProjectTitle,
  },
  {
    header: "Partido",
    accessorKey: "party_name",
    size: 100,
  },
  {
    header: "Voto",
    accessorKey: "vote",
    filterVariant: "select",
    mobileCardPosition: "extraContent",
    filterSelectOptions: [
      { text: "Afirmativo", value: "POSITIVE" },
      { text: "Negativo", value: "NEGATIVE" },
      { text: "Ausente", value: "ABSENT" },
      { text: "Abstención", value: "ABSTENTION" },
    ],
    accessorFn: (row) => (
      <MKBox display="flex" justifyContent={{ xs: "left", sm: "center" }}>
        <MKBadge badgeContent={row.vote} color={voteColor[row.vote?.toLowerCase()]} />
      </MKBox>
    ),
    size: 40,
  },
];

export default function LegislatorVotes() {
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

  const getVotesData = (params) => {
    return getLegislatorVotes(id, params).catch((err) => {
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
                <VotesCard
                  afirmative={legislator.votes?.afirmatives}
                  negative={legislator.votes?.negatives}
                  abstention={legislator.votes?.abstentions}
                  absent={legislator.votes?.absents}
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} lg={8} spacing={2}>
              <Grid item xs={12}>
                <ResponsiveTable
                  enableRowActions={false}
                  columns={votingsColumns}
                  fetchData={getVotesData}
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
