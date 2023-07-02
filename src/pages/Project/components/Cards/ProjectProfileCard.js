import React from 'react';

import propTypes from 'prop-types';

// Components
import ProfileCard from 'components/Cards/ProfileCard';

// Utils
import { fSentence } from 'utils/formatString';

ProjectProfileCard.propTypes = {
  project: propTypes.shape({
    name: propTypes.string.isRequired,
    number: propTypes.string.isRequired,
    status: propTypes.string.isRequired,
  }).isRequired,
};

export default function ProjectProfileCard({ project }) {
  function getProjectColor() {
    switch (project.status) {
      case 'En curso':
        return 'warning';
      case 'Aprobado':
        return 'success';
      case 'Rechazado':
        return 'error';
    }
  }

  const badge = {
    content: project.status,
    color: getProjectColor(),
  };
  return <ProfileCard title={fSentence(project.name)} subtitle={project.number} badge={badge} />;
}
