import React from 'react';

import propTypes from 'prop-types';

// Components
import SingleBarChart from '../../../../components/Charts/SingleBarChart/SingleBarChart';
import { fPercent } from 'utils/formatNumber';
import { projectsColor, projectsBorderColor } from 'assets/theme/base/colorsMapping.js';

ProjectsChart.propTypes = {
  data: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string.isRequired,
      value: propTypes.number.isRequired,
    })
  ).isRequired,
};

export default function ProjectsChart({ data }) {
  const callbacks = {
    label: function (context) {
      return `${context.dataset.label}: ${fPercent(context.parsed.x)}`;
    },
    title: () => null,
  };

  const aspectRatio = 6;

  return (
    <SingleBarChart
      label="Proyectos presentados"
      data={data}
      horizontal={true}
      aspectRatio={aspectRatio}
      tooltipCallbacks={callbacks}
      colorConfig={{
        backgroundColor: (item) => projectsColor[item.label.toLowerCase()],
        borderColor: (item) => projectsBorderColor[item.label.toLowerCase()],
      }}
    />
  );
}
