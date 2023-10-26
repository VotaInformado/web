import React from "react";

import PropTypes from "prop-types";

// Components
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import configs from "./configs";
import geoJson from "./maps/argentina.json";

echarts.registerMap("Argentina", geoJson);

MapChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
};

export default function MapChart({ data }) {
  const config = configs({ data });
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ReactECharts option={config} notMerge={true} lazyUpdate={true} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
