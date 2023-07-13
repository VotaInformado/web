import React from 'react';

import propTypes from 'prop-types';

// Components
import ProfileCard from 'components/Cards/ProfileCard';

// Utils
import { fSentence } from 'utils/formatString';

// Theme
import { projectStatusColor } from 'assets/theme/base/colorsMapping';

ProjectProfileCard.propTypes = {
  project: propTypes.shape({
    name: propTypes.string.isRequired,
    number: propTypes.string.isRequired,
    status: propTypes.string.isRequired,
    sourceHouse: propTypes.string.isRequired,
  }).isRequired,
};

export default function ProjectProfileCard({ project }) {
  function getProjectContent() {
    if (project.status === 'Aprobado') {
      return project.status;
    }
    if (project.status === 'Rechazado') {
      return project.status;
    }
    return 'En curso';
  }

  const badge = {
    content: getProjectContent(),
    color: projectStatusColor[project.status.toLowerCase()] ?? projectStatusColor.default,
  };
  return (
    <ProfileCard
      title={fSentence(project.name)}
      subtitle={`Expediente: ${project.number}`}
      subtitle2={`Cámara de origen: ${project.sourceHouse}`}
      badge={badge}
    />
  );
}
