// Components

import React, { useEffect, useState } from "react";

// Components
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import PageBase from "pages/PageBase";
import ProjectProfileCard from "pages/Project/components/Cards/ProjectProfileCard";
import ParliamentVotesCard from "components/Cards/ParliamentVotesCard";
import ResponsiveTable from "components/Tables/ResponsiveTable";
import MKTypography from "components/MKTypography";
import MKBadge from "components/MKBadge";
import MKBox from "components/MKBox";
import Link from "@mui/material/Link";
import { toast } from "react-toastify";
// Adapters
import { getProject } from "adapters/projectAdapter";
// Theme
import { voteColor } from "assets/theme/base/colorsMapping";
// Routes
import { useLocation, useSearchParams, useNavigate, Link as RouterLink } from "react-router-dom";
// Utils
import { countVotes } from "pages/PredictionResult/Components/ChamberResult";
import { votingMapping } from "adapters/predictionAdapter";
import mapAttrs from "utils/mapAttrs";
import { voteTranslation } from "adapters/projectVotesAdapter";

const votingsColumns = [
  {
    header: "Nombre",
    accessorKey: "legislator",
    size: 120,
    mobileCardPosition: "title",
    enableColumnFilter: false,
    accessorFn: (row) => {
      return (
        <MKTypography variant="body2" fontWeight="bold">
          <Link component={RouterLink} underline="hover" to={`/legislador/${row.legislator_id}`}>
            {row.legislator}
          </Link>
        </MKTypography>
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
  const location = useLocation();
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [votesDataMapped, setVotesDataMapped] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const projectId = searchParams.get("proyecto");
  const chamber = searchParams.get("camara");
  const { votesData } = location.state || {};
  if (!projectId || !votesData) {
    toast.error("No se encontró la votación");
    navigate(-1);
  }

  useEffect(() => {
    setLoading(true);
    getProject(projectId)
      .then((res) => setProject(res))
      .finally(() => setLoading(false));
  }, [projectId]);

  useEffect(() => {
    const mapped = votesData.map((vote) => {
      const voteCopy = { ...vote };
      return mapAttrs(voteCopy, votingMapping);
    });
    setVotesDataMapped(mapped);
  }, [votesData]);

  async function getVotingsData({ pagination, columnFilters, globalFilter, sorting }) {
    // Manually filter data
    let filteredData = votesDataMapped;
    if (globalFilter) {
      filteredData = filteredData.filter((vote) => {
        return vote.legislator.toLowerCase().includes(globalFilter.toLowerCase());
      });
    }
    if (columnFilters.length > 0) {
      filteredData = filteredData.filter((vote) => {
        return columnFilters.every((filter) => {
          const value = vote[filter.id];
          const translatedFilter = voteTranslation[filter.value];
          return translatedFilter.includes(value);
        });
      });
    }
    if (pagination) {
      const { pageIndex, pageSize } = pagination;
      const startRow = pageIndex * pageSize;
      const endRow = startRow + pageSize;
      filteredData = filteredData.slice(startRow, endRow);
    }
    return {
      totalRows: votesDataMapped?.length,
      data: filteredData,
    };
  }

  const renderVotesCard = () => {
    const result = countVotes(votesData);
    return (
      <ParliamentVotesCard
        house={chamber}
        afirmative={result.afirmative}
        negative={result.negative}
        abstention={result.abstention}
        absent={result.absent}
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
              <MKTypography
                variant="h4"
                fontWeight="bold"
                color="primary"
                gutterBottom
                style={{ textDecoration: "underline" }}>
                Detalle de la predicción
              </MKTypography>
              <ProjectProfileCard project={project} />
            </Grid>
            <Grid item xs={12} lg={5} />
          </Grid>
          <Grid container spacing={2} mt={2} alignItems="flex-start">
            <Grid container item xs={12} lg={5} spacing={2}>
              <Grid item xs={12}>
                {renderVotesCard()}
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
                  enableSorting={false}
                />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </PageBase>
  );
}
