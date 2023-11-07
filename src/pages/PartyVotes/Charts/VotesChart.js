import React from "react";

import propTypes from "prop-types";

// Components
import SingleBarChart from "components/Charts/SingleBarChart/SingleBarChart";
import { fPercent } from "utils/formatNumber";
import { votesColor, voteBorderColor } from "assets/theme/base/colorsMapping.js";

VotesChart.propTypes = {
  data: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string.isRequired,
      value: propTypes.number.isRequired,
    })
  ).isRequired,
};

export default function VotesChart({ afirmativos, negativos, abstenciones, ausentes }) {
  const callbacks = {
    label: function (context) {
      return `${context.dataset.label}: ${fPercent(context.parsed.x)}`;
    },
    title: () => null,
  };

  const chartData = [
    {
      label: "Afirmativos",
      value: afirmativos,
    },
    {
      label: "Negativos",
      value: negativos,
    },
    {
      label: "Abstenciones",
      value: abstenciones,
    },
    {
      label: "Ausentes",
      value: ausentes,
    },
  ];

  const aspectRatio = 6;

  return (
    <SingleBarChart
      label="Votos"
      data={chartData}
      horizontal={true}
      aspectRatio={aspectRatio}
      tooltipCallbacks={callbacks}
      colorConfig={{
        backgroundColor: (item) => votesColor[item.label.toLowerCase()],
        borderColor: (item) => voteBorderColor[item.label.toLowerCase()],
      }}
    />
  );
}
