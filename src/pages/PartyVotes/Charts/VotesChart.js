import React from "react";

import propTypes from "prop-types";

// Components
import SingleBarChart from "components/Charts/SingleBarChart/SingleBarChart";
import { fPercent } from "utils/formatNumber";
import { votesColor, voteBorderColor } from "assets/theme/base/colorsMapping.js";

VotesChart.propTypes = {
  afirmativos: propTypes.number.isRequired,
  negativos: propTypes.number.isRequired,
  abstenciones: propTypes.number.isRequired,
  ausentes: propTypes.number.isRequired,
};

VotesChart.defaultProps = {
  afirmativos: 0,
  negativos: 0,
  abstenciones: 0,
  ausentes: 0,
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
