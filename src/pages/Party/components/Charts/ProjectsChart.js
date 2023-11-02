import React from "react";

import propTypes from "prop-types";

// Components
import BarChart from "components/Charts/BarChart/BarChart";

ProjectsChart.propTypes = {
  projectsByYear: propTypes.object.isRequired,
};

ProjectsChart.defaultProps = {
  projectsByYear: {},
};

export default function ProjectsChart({ projectsByYear }) {
  const proyectsChartData = Object.entries(projectsByYear)?.map((entry) => {
    const [year, number] = entry;
    return {
      label: year,
      value: number,
    };
  });
  return proyectsChartData && <BarChart data={proyectsChartData} dataLabel="Proyectos" title="Proyectos por año" />;
}
