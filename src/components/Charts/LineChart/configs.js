import typography from 'assets/theme/base/typography';

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
        text: title ?? '',
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
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
          // color: '#b2b9bf',
          // font: {
          //   size: 11,
          //   family: typography.fontFamily,
          //   style: 'normal',
          //   lineHeight: 2,
          // },
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
          // color: '#b2b9bf',
          padding: 10,
          // font: {
          //   size: 11,
          //   family: typography.fontFamily,
          //   style: 'normal',
          //   lineHeight: 2,
          // },
        },
      },
    },
  };
}
