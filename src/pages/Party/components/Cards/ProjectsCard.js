import React, { useState, useEffect } from "react";

import propTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import AuthorshipsChart from "../Charts/AuthorshipsChart";
import ProjectsChart from "../Charts/ProjectsChart";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import LoadingMessage from "components/LoadingMessage";
// Adapters
import { getPartyProjects } from "adapters/partyProjectsAdapter";
import { getPartyAuthorships } from "adapters/partyAuthorshipsAdapter";

ProjectsCard.propTypes = {
  partyId: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  actionLink: propTypes.string,
};

export default function ProjectsCard({ partyId, actionLink }) {
  const [projectsByYear, setProjectsByYear] = useState({});
  const [authorships, setAuthorships] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const extraSmallSize = useMediaQuery(theme.breakpoints.down("sm"));

  const goToProjects = {
    route: actionLink,
    tooltip: "Ver todos los proyectos",
    label: "Ver todos",
    icon: "arrow_forward",
  };

  function aggregateProjectsByYear(projects) {
    const aux = projects.reduce((acc, project) => {
      const { year } = project;
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year] += 1;
      return acc;
    }, {});
    setProjectsByYear(aux);
  }

  useEffect(() => {
    if (!partyId) return;
    getPartyProjects(partyId)
      .then((data) => {
        setProjectCount(data.length);
        aggregateProjectsByYear(data);
      })
      .finally(() => setLoading(false));
    getPartyAuthorships(partyId, { pagination: { pageIndex: 0, pageSize: 5 } }).then((res) => {
      setAuthorships(res.data);
    });
  }, [partyId]);

  return (
    <CardBase title="Proyectos" action={actionLink && goToProjects}>
      <Stack direction="column" spacing={4} alignItems="center">
        {loading ? (
          <LoadingMessage message="Cargando proyectos..." />
        ) : (
          <>
            <MKBox mb={2}>
              <MKTypography variant="body2">Total de proyectos presentados: {projectCount}</MKTypography>
            </MKBox>
            <MKBox sx={{ width: "100%", height: { sm: "12em", lg: "15em" } }}>
              <ProjectsChart projectsByYear={projectsByYear} />
            </MKBox>
            <MKBox sx={{ width: "100%", height: { sm: "12em", lg: "15em" } }}>
              <AuthorshipsChart authorships={extraSmallSize ? authorships.slice(0, 3) : authorships} />
            </MKBox>
          </>
        )}
      </Stack>
    </CardBase>
  );
}
