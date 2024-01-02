import React from "react";

import propTypes from "prop-types";

// Components
import ProfileCard from "components/Cards/ProfileCard";

LegislatorProfileCard.propTypes = {
  legislator: propTypes.shape({
    image: propTypes.string,
    fullName: propTypes.string.isRequired,
    party: propTypes.string,
    lastSeat: propTypes.string.isRequired,
    isActive: propTypes.bool.isRequired,
  }).isRequired,
};

export default function LegislatorProfileCard({ legislator }) {
  const badge = {
    content: legislator.isActive ? "En actividad" : "No activo",
    color: legislator.isActive ? "success" : "error",
  };
  return (
    <ProfileCard
      avatar={legislator.image}
      title={legislator.fullName}
      subtitle={legislator.party}
      subtitle2={legislator.lastSeat}
      badge={badge}
    />
  );
}
