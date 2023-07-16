import React from "react";

// components
import CardBase from "components/Cards/CardBase";
import TimelineChart from "components/Charts/TimelineChart/TimelineChart";

const mockActivity = [
  {
    label: "FIT",
    caption: "2018-2019",
    icon: "groups",
  },
  {
    label: "Frente de Todos",
    caption: "2019-2021",
    icon: "groups",
  },
  {
    label: "Presenta proyecto?",
    caption: "2021-2023",
  },
];

export default function ActivityCard() {
  return (
    <CardBase title="Trayectoria">
      <TimelineChart data={mockActivity} orientation="vertical" />
    </CardBase>
  );
}
