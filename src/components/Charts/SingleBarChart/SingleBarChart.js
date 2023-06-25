import React, { useMemo } from 'react';

import propTypes from 'prop-types';

// react-chartjs-2 components
import { Bar } from 'react-chartjs-2';

import configs from './configs.js';

export default function SingleBarChart({ label, horizontal, aspectRatio, tooltipCallbacks, colorConfig, data }) {
  const chartData = useMemo(() => {
    const sum = data.reduce((acc, item) => acc + item.value, 0);
    return {
      labels: [label],
      datasets: data.map((item) => ({
        label: item.label,
        data: [(item.value / sum) * 100],
        backgroundColor: colorConfig.backgroundColor(item),
        borderColor: colorConfig.borderColor(item),
        borderWidth: 1,
      })),
    };
  }, [data]);

  const options = configs(horizontal, aspectRatio, tooltipCallbacks);
  return <Bar data={chartData} options={options} />;
}

SingleBarChart.propTypes = {
  label: propTypes.string.isRequired,
  horizontal: propTypes.bool,
  aspectRatio: propTypes.number,
  tooltipCallbacks: propTypes.shape({
    label: propTypes.func.isRequired,
    title: propTypes.func.isRequired,
  }),
  colorConfig: propTypes.shape({
    backgroundColor: propTypes.func.isRequired,
    borderColor: propTypes.func.isRequired,
  }),
  data: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string.isRequired,
      value: propTypes.number.isRequired,
    })
  ).isRequired,
};

SingleBarChart.defaultProps = {
  horizontal: false,
  aspectRatio: 2,
  tooltipCallbacks: {
    label: (context) => `${context.dataset.label}: ${context.parsed.x}`,
    title: (context) => `${context[0].label}`,
  },
  colorConfig: {
    backgroundColor: () => 'primary',
    borderColor: () => 'primary',
  },
};
