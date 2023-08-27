import React from "react";

import propTypes from "prop-types";

// Components
import ProfileCard from "components/Cards/ProfileCard";

// Utils
import { fSentence } from "utils/formatString";

// Theme
import { projectStatusColor } from "assets/theme/base/colorsMapping";

ProjectProfileCard.propTypes = {
  project: propTypes.shape({
    title: propTypes.string,
    deputiesProjectId: propTypes.string,
    senateProjectId: propTypes.string,
    status: propTypes.string,
    originChamber: propTypes.string,
  }).isRequired,
};

export default function ProjectProfileCard({ project }) {
  function getStatusSummary(status) {
    if (!status) {
      return "Sin estado";
    } else if (status === "Aprobado" || status === "Rechazado") {
      return status;
    }
    return "En curso";
  }

  function getStatusColor(status) {
    if (!status) return projectStatusColor.unkown;
    return projectStatusColor[status.toLowerCase()] ?? projectStatusColor.default;
  }
  const badge = {
    content: getStatusSummary(project.status),
    color: getStatusColor(project.status),
  };

  function makeSubtitle(project) {
    let exp = "";
    if (project.senateProjectId) {
      exp += `Expediente Senado: ${project.senateProjectId}. `;
    }
    if (project.deputiesProjectId) {
      exp += `Expediente Diputados: ${project.deputiesProjectId}. `;
    }
    return exp;
  }
  return (
    <ProfileCard
      title={fSentence(project.title)}
      subtitle={makeSubtitle(project)}
      subtitle2={`Cámara de origen: ${project.originChamber}`}
      badge={badge}
    />
  );
}
