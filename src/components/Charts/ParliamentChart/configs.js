// Configuration for Highcharts Parliament Chart
// More info can be found at:
//  - https://api.highcharts.com/highcharts
//  - https://github.com/highcharts/highcharts-react
//  - String formatting options: https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting

export default function configs({ title, subtitle, labeled = false, seriesName, data }) {
  return {
    chart: {
      type: 'item',
    },

    title: {
      text: title,
    },

    subtitle: {
      text: subtitle,
    },

    legend: {
      labelFormat: labeled && '{name} <span style="opacity: 0.4">{y}</span>',
      enabled: labeled,
    },

    credits: {
      enabled: false,
    },

    series: [
      {
        name: seriesName,
        data: data,
        dataLabels: {
          enabled: false,
          format: '{point.label}',
          style: {
            textOutline: '3px contrast',
          },
        },

        // To make it a semi-circle
        center: ['50%', '88%'],
        size: '170%',
        startAngle: -100,
        endAngle: 100,
      },
    ],
    accessibility: {
      enabled: false,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {
            series: [
              {
                dataLabels: {
                  distance: -30,
                },
                size: '150%',
              },
            ],
          },
        },
      ],
    },
  };
}
