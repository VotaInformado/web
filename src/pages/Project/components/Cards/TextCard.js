import React from 'react';

import PropTypes from 'prop-types';

// Components
import CardBase from 'components/Cards/CardBase';
import MKTypography from 'components/MKTypography';

TextCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

export default function TextCard({ title, text }) {
  return (
    <CardBase title={title}>
      <MKTypography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
        {text || 'No hay información disponible'}
      </MKTypography>
    </CardBase>
  );
}
