export default function configs(horizontal, aspectRatio, tooltipCallbacks) {
  return {
    indexAxis: horizontal ? "y" : "x",
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: aspectRatio,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: tooltipCallbacks ?? null,
      },
      datalabels: {
        font: {
          weight: "bold",
        },
        color: "white",
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
        stacked: true,
        display: false,
      },
      x: {
        max: 100,
        display: false,
        stacked: true,
      },
    },
  };
}
