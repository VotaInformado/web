export default function configs(horizontal, aspectRatio, tooltipCallbacks) {
  return {
    indexAxis: horizontal ? 'y' : 'x',
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
