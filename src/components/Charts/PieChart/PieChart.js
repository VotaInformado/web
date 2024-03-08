import propTypes from "prop-types";

import { Pie } from "react-chartjs-2";
import configs from "./configs";

// Colors
import colors from "assets/theme/base/colors";

PieChart.propTypes = {
  title: propTypes.string,
  label: propTypes.string.isRequired,
  data: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string.isRequired,
      value: propTypes.number.isRequired,
    })
  ).isRequired,
};

export default function PieChart({ title, label, data }) {
  const backgroundColors = colors.pieChart.backgroundColors;

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: label,
        data: data.map((item) => item.value),
        backgroundColor: backgroundColors,
        tension: 0.4,
      },
    ],
  };

  const options = configs(title);

  return <Pie data={chartData} options={options} />;
}
