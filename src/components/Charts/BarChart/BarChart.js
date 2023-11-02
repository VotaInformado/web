import propTypes from "prop-types";

import { Bar } from "react-chartjs-2";
import configs from "./configs";

export default function BarChart({ data, dataLabel, title }) {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: dataLabel,
        data: data.map((item) => item.value),
        fill: false,
        backgroundColor: "#3f51b5",
        borderColor: "#3f51b5",
        tension: 0.4,
      },
    ],
  };

  const options = configs(title);

  return <Bar data={chartData} options={options} />;
}

BarChart.propTypes = {
  data: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string.isRequired,
      value: propTypes.number.isRequired,
    })
  ).isRequired,
  dataLabel: propTypes.string,
  title: propTypes.string,
};
