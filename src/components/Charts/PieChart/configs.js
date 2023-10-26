import typography from "assets/theme/base/typography";

export default function configs(title) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: title ? true : false,
        text: title ?? "",
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };
}
