import React from "react";

import propTypes from "prop-types";

// Components
import ProfileCard from "components/Cards/ProfileCard";

LawProfileCard.propTypes = {
  law: propTypes.shape({
    title: propTypes.string,
    deputiesProjectId: propTypes.string,
    senateProjectId: propTypes.string,
    status: propTypes.string,
    originChamber: propTypes.string,
    publicationDate: propTypes.string,
  }).isRequired,
};

export default function LawProfileCard({ law }) {
  function makeSubtitle(law) {
    let exp = `Fecha de publicación: ${law.publicationDate}. `;
    return exp;
  }

  return <ProfileCard title={law.title} subtitle={makeSubtitle(law)} />;
}
