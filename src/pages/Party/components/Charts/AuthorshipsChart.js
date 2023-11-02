import React from "react";

import propTypes from "prop-types";

// Components
import BarChart from "components/Charts/BarChart/BarChart";

AuthorshipsChart.propTypes = {
  authorships: propTypes.arrayOf(
    propTypes.shape({
      person: propTypes.shape({
        name: propTypes.string.isRequired,
      }),
      authorshipCount: propTypes.number.isRequired,
    })
  ).isRequired,
};

export default function AuthorshipsChart({ authorships }) {
  const authorshipsChartData = authorships?.map((entry) => {
    return {
      label: entry.person.name,
      value: entry.authorshipCount,
    };
  });
  return (
    authorshipsChartData && (
      <BarChart data={authorshipsChartData} dataLabel="Proyectos" title="Legisladores que más proyectos presentaron" />
    )
  );
}
