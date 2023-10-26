import React from "react";

import propTypes from "prop-types";

// Components
import ProfileCard from "components/Cards/ProfileCard";

PartyProfileCard.propTypes = {
  party: propTypes.shape({
    name: propTypes.string.isRequired,
  }).isRequired,
};

export default function PartyProfileCard({ party }) {
  return <ProfileCard title={party.name} />;
}
