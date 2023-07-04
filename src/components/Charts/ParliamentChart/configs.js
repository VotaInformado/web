// Configuration for Highcharts Parliament Chart
// More info can be found at: https://api.highcharts.com/highcharts

export default function configs({ title, subtitle, labeled = false }) {
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
        name: 'Representatives',
        keys: ['name', 'y', 'color', 'label'],
        data: [
          ['The Left', 39, '#CC0099', 'DIE LINKE'],
          ['Social Democratic Party', 206, '#EE0011', 'SPD'],
          ["South Schleswig Voters' Association", 1, '#000099', 'SSW'],
        ],
        dataLabels: {
          enabled: true,
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
