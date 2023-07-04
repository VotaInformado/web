import React from 'react';

// Highcharts components
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsItem from 'highcharts/modules/item-series.js';

import configs from './configs';
import MKBox from 'components/MKBox';

highchartsItem(Highcharts);

export default function ParliamentChart({ }) {
  const confs = configs({});
  return (
    <MKBox sx={{ height: { xs: 180, lg: 300 } }}>
      <HighchartsReact highcharts={Highcharts} options={confs} containerProps={{ style: { height: '100%' } }} />
    </MKBox>
  );
}
