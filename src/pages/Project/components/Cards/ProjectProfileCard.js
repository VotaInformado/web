import React from "react";

import propTypes from "prop-types";

// Components
import ProfileCard from "components/Cards/ProfileCard";
import Stack from "@mui/material/Stack";
import CopyToClipboardButton from "components/CopyToClipboardButton";
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
      return "Sin Datos";
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
    let elements = [];
    if (project.senateProjectId) {
      elements.push(
        <Stack key="senate" direction="row" alignItems="center">
          {`Expediente Senado: ${project.senateProjectId}`}
          <CopyToClipboardButton value={project.senateProjectId} />
          <div>&nbsp;</div>
        </Stack>
      );
    }
    if (project.deputiesProjectId) {
      elements.push(
        <Stack key="deputies" direction="row" alignItems="center">
          {`Expediente Diputados: ${project.deputiesProjectId}`}
          <CopyToClipboardButton value={project.deputiesProjectId} />
          {" "}
        </Stack>
      );
    }
    return <Stack direction="row">{elements}</Stack>;
  }

  return (
    <ProfileCard
      title={project.title}
      subtitle={makeSubtitle(project)}
      subtitle2={`Cámara de origen: ${project.originChamber}`}
      badge={badge}
    />
  );
}
