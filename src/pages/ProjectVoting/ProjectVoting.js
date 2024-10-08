// Components

import React, { useEffect, useState } from "react";

// Components
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import PageBase from "pages/PageBase";
import ProjectProfileCard from "pages/Project/components/Cards/ProjectProfileCard";
import ParliamentVotesCard from "components/Cards/ParliamentVotesCard";
import ResponsiveTable from "components/Tables/ResponsiveTable";
import MKBadge from "components/MKBadge";
import MKBox from "components/MKBox";
import Link from "@mui/material/Link";
import PartyVotesCard from "./components/Cards/PartyVotesCard";
import NoData from "components/NoData";
import { toast } from "react-toastify";
// Adapters
import { getProject } from "adapters/projectAdapter";
import { getProjectVotes } from "adapters/projectVotesAdapter";
// Theme
import { voteColor } from "assets/theme/base/colorsMapping";
// Routes
import { useParams, useSearchParams, Link as RouterLink, generatePath, useNavigate } from "react-router-dom";
import PATHS from "routes/paths";

const votingsColumns = [
  {
    header: "Nombre",
    accessorKey: "person",
    size: 120,
    mobileCardPosition: "title",
    enableColumnFilter: false,
    accessorFn: (row) => {
      return (
        row.person?.id && (
          <Link component={RouterLink} underline="hover" to={generatePath(PATHS.legislator, { id: row.person?.id })}>
            {row.person?.fullName}
          </Link>
        )
      );
    },
  },
  {
    header: "Partido",
    mobileCardPosition: "overline",
    size: 120,
    accessorFn: (row) => {
      if (!row.party_name && !row.party) return <NoData />;
      return row.party ? (
        <Link component={RouterLink} underline="hover" to={generatePath(PATHS.party, { id: row.party })}>
          {row.party_name}
        </Link>
      ) : (
        row.party_name
      );
    },
  },
  {
    header: "Voto",
    accessorKey: "vote",
    mobileCardPosition: "extraContent",
    filterVariant: "select",
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

export default function ProjectVoting() {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const chamber = searchParams.get("camara");
  const date = searchParams.get("fecha");

  if (!chamber || !date) {
    toast.error("No se encontró la votación");
    navigate(-1);
  }

  useEffect(() => {
    setLoading(true);
    getProject(id)
      .then((res) => setProject(res))
      .finally(() => setLoading(false));
  }, [id]);

  const getVotingsData = (params) => {
    return getProjectVotes(id, chamber, date, params).catch((err) => {
      console.log(err);
      toast.error("Ocurrió un error al obtener los votos");
      navigate(-1);
    });
  };

  const renderVotesCard = () => {
    const voting = project?.votings?.find((voting) => voting.chamber === chamber && voting.date === date);
    if (!voting) return;
    return (
      <ParliamentVotesCard
        house={voting.chamber}
        date={voting.date}
        afirmative={voting.afirmatives}
        negative={voting.negatives}
        abstention={voting.abstentions}
        absent={voting.absents}
      />
    );
  };

  return (
    <PageBase>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <Grid container alignItems="center" rowSpacing={5}>
            <Grid item xs={12} lg={7}>
              <ProjectProfileCard project={project} />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2} alignItems="flex-start">
            <Grid container item xs={12} lg={5} spacing={2}>
              <Grid item xs={12}>
                {renderVotesCard()}
              </Grid>
              <Grid item xs={12}>
                <PartyVotesCard projectId={id} chamber={chamber} date={date} />
              </Grid>
            </Grid>
            <Grid container item xs={12} lg={7} spacing={2}>
              <Grid item xs={12}>
                <ResponsiveTable
                  enableRowActions={false}
                  columns={votingsColumns}
                  fetchData={getVotingsData}
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
