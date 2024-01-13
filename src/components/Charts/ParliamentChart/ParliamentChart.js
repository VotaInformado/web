import React from "react";

import PropTypes from "prop-types";

// Highcharts components
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsItem from "highcharts/modules/item-series.js";

import configs from "./configs";
import MKBox from "components/MKBox";

highchartsItem(Highcharts);

ParliamentChart.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  labeled: PropTypes.bool,
  seriesName: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      y: PropTypes.number.isRequired,
      color: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
};

ParliamentChart.defaultProps = {
  labeled: false,
};

export default function ParliamentChart({ title, subtitle, labeled, seriesName, data }) {
  const confs = configs({ title, subtitle, labeled, seriesName, data });
  return (
    <MKBox sx={{ height: { xs: 180, lg: 200 } }}>
      <HighchartsReact highcharts={Highcharts} options={confs} containerProps={{ style: { height: "100%" } }} />
    </MKBox>
  );
}
