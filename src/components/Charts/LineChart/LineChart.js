import propTypes from "prop-types";

import { Line } from "react-chartjs-2";
import configs from "./configs";

export default function LineChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Patrimonio",
        data: data.map((item) => item.value),
        fill: false,
        backgroundColor: "#3f51b5",
        borderColor: "#3f51b5",
        tension: 0.4,
      },
    ],
  };

  const options = configs("Patrimonio declarado a lo largo del tiempo");

  return <Line data={chartData} options={options} />;
}

LineChart.propTypes = {
  data: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string.isRequired,
      value: propTypes.number.isRequired,
    })
  ).isRequired,
};
