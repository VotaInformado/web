import React, { useState } from 'react';

// components
import CardBase from 'components/Cards/CardBase';
import { Tab, Tabs } from '@mui/material';
import TimelineChart from 'components/Charts/TimelineChart/TimelineChart';

const mockActivity = [
  {
    label: 'FIT',
    caption: '2018-2019',
    icon: 'groups',
  },
  {
    label: 'Frente de Todos',
    caption: '2019-2021',
    icon: 'groups',
  },
  {
    label: 'Presenta proyecto?',
    caption: '2021-2023',
  },
];

export default function ActivityCard() {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabType = (event, newValue) => setActiveTab(newValue);

  return (
    <CardBase>
      <Tabs value={activeTab} onChange={handleTabType}>
        <Tab label="Trayectoria" />
        <Tab label="Proyectos presentados" />
      </Tabs>
      {activeTab === 0 && <TimelineChart data={mockActivity} orientation="vertical" />}
    </CardBase>
  );
}
