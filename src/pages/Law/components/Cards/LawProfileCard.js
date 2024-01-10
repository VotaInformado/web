import React from "react";

import propTypes from "prop-types";

// Components
import ProfileCard from "components/Cards/ProfileCard";
import CardBase from "components/Cards/CardBase";

// Utils
import { fSentence } from "utils/formatString";
import MKBox from "components/MKBox";

const getAssociatedProjectInfo = (law) => {
  let associated_project = law.associated_project;
  if (!associated_project) {
    return null;
  }
  let project_id = associated_project?.id;
  console.log("Proyect id: ", project_id);
  let link = `/proyecto/${project_id}`;
  // We return the link with its text being the project id
  return (
    <MKBox>
      <a href={link}>Ver proyecto asociado</a>
    </MKBox>
  );
};

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

  return <ProfileCard title={law.title} subtitle={makeSubtitle(law)} subtitle2={getAssociatedProjectInfo(law)} />;
}
