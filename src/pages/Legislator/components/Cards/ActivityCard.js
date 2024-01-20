import React from "react";
import PropTypes from "prop-types";

// components
import CardBase from "components/Cards/CardBase";
import TimelineChart from "components/Charts/TimelineChart/TimelineChart";

ActivityCard.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      caption: PropTypes.string,
      icon: PropTypes.string,
    })
  ),
};

ActivityCard.defaultProps = {
  events: [],
};

export default function ActivityCard({ events }) {
  return (
    <CardBase title="Trayectoria" style={{ height: "100%" }}>
      <TimelineChart data={events} orientation="vertical" />
    </CardBase>
  );
}
