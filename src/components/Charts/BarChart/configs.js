export default function configs(title) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: title ? true : false,
        text: title ?? "",
      },
      datalabels: {
        font: {
          weight: "bold",
        },
        anchor: "end",
        align: "end",
        display: function (context) {
          return context.dataset.data[context.dataIndex] > 5;
        },
        formatter: function (value, context) {
          const val = context.dataset.itemLabel?.[context.dataIndex] || value;
          return Math.round(val);
        },
      },
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5],
        },
        ticks: {
          display: true,
          padding: 10,
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
          borderDash: [5, 5],
        },
        ticks: {
          display: true,
          padding: 10,
        },
      },
    },
  };
}
