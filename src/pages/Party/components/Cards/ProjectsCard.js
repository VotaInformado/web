import React, { useState, useEffect } from "react";

import propTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import BarChart from "components/Charts/BarChart/BarChart";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import AuthorshipsChart from "../Charts/AuthorshipsChart";
import ProjectsChart from "../Charts/ProjectsChart";
import { Stack } from "@mui/material";

import { getPartyProyects } from "adapters/partyProjectsAdapter";
import { getPartyAuthorships } from "adapters/partyAuthorshipsAdapter";

ProjectsCard.propTypes = {
  partyId: propTypes.number.isRequired,
};

export default function ProjectsCard({ partyId }) {
  const [projectsByYear, setProjectsByYear] = useState({});
  const [authorships, setAuthorships] = useState([]);
  const [projectCount, setProjectCount] = useState(0);

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
    getPartyProyects(partyId).then((data) => {
      setProjectCount(data.length);
      aggregateProjectsByYear(data);
    });
    getPartyAuthorships(partyId, { pagination: { pageIndex: 0, pageSize: 5 } }).then((res) => {
      setAuthorships(res.data);
    });
  }, [partyId]);

  return (
    <CardBase title="Proyectos">
      <Stack direction="column" spacing={2} alignItems="center">
        <MKBox mb={5}>
          <MKTypography variant="body2" color="textSecondary">
            Total de proyectos presentados: {projectCount}
          </MKTypography>
        </MKBox>
        <MKBox sx={{ width: "100%", height: { sm: "12em", lg: "15em" } }}>
          <ProjectsChart projectsByYear={projectsByYear} />
        </MKBox>
        <MKBox sx={{ width: "100%", height: { sm: "12em", lg: "15em" } }}>
          <AuthorshipsChart authorships={authorships} />
        </MKBox>
      </Stack>
    </CardBase>
  );
}
