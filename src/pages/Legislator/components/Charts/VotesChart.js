import React from "react";

import propTypes from "prop-types";

// Components
import SingleBarChart from "components/Charts/SingleBarChart/SingleBarChart";
import { fPercent } from "utils/formatNumber";
import { voteColor, voteBorderColor } from "assets/theme/base/colorsMapping.js";

VotesChart.propTypes = {
  data: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string.isRequired,
      value: propTypes.number.isRequired,
    })
  ).isRequired,
};

export default function VotesChart({ data }) {
  const callbacks = {
    label: function (context) {
      return `${context.dataset.label}: ${fPercent(context.parsed.x)}`;
    },
    title: () => null,
  };

  const aspectRatio = 6;

  return (
    <SingleBarChart
      label="Votos"
      data={data}
      horizontal={true}
      aspectRatio={aspectRatio}
      tooltipCallbacks={callbacks}
      colorConfig={{
        backgroundColor: (item) => voteColor[item.label.toLowerCase()],
        borderColor: (item) => voteBorderColor[item.label.toLowerCase()],
      }}
    />
  );
}
