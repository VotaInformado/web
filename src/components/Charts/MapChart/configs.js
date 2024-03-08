// Configuration for the MapChart in Apache ECharts
// More info can be found at:
//  - https://echarts.apache.org/en/option.html

import { darken, lighten } from "assets/theme/functions/colorUtils";
import { maxBy } from "lodash";

export default function configs({ data }) {
  const maxValue = maxBy(data, "value")?.value || 100;

  function tooltipFormatter(params) {
    const label = params.data?.label || params.name;
    return params.value ? `${label}: ${params.value}` : `${label}: 0`;
  }

  return {
    tooltip: {
      trigger: "item",
      formatter: tooltipFormatter,
    },
    visualMap: {
      type: "continuous",
      left: "right",
      min: 0,
      max: maxValue,
      inRange: {
        color: [
          "#fff",
          lighten("#58508D", 1),
          lighten("#58508D", 0.5),
          "#58508D",
          darken("#58508d", 0.5),
          darken("#58508d", 1),
        ],
      },
      text: ["Máximo", "Mínimo"],
      realtime: true,
      hoverLink: true,
    },

    series: [
      {
        id: "population",
        type: "map",
        roam: false,
        map: "Argentina",
        animationDurationUpdate: 1000,
        universalTransition: true,
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
          itemStyle: {
            borderWidth: 2.5,
            borderColor: "#58508d",
          },
        },
        select: {
          disabled: true,
        },
        data: data,
      },
    ],
  };
}
