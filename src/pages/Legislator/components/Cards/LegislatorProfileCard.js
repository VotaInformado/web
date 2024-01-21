import React from "react";

import propTypes from "prop-types";

// Components
import ProfileCard from "components/Cards/ProfileCard";

const DEFAULT_PROFILE_IMAGE_URL = "https://t3.ftcdn.net/jpg/05/71/08/24/360_F_571082432_Qq45LQGlZsuby0ZGbrd79aUTSQikgcgc.jpg"

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
      avatar={legislator.pictureUrl || DEFAULT_PROFILE_IMAGE_URL}
      title={legislator.fullName}
      subtitle={legislator.party}
      subtitle2={legislator.lastSeat}
      badge={badge}
    />
  );
}
