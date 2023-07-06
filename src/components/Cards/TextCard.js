import React from 'react';

import PropTypes from 'prop-types';

// Components
import CardBase from 'components/Cards/CardBase';
import MKTypography from 'components/MKTypography';
import MKBox from 'components/MKBox';

TextCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  sx: PropTypes.shape({
    textContainer: PropTypes.object,
  }),
};

export default function TextCard({ title, text, sx }) {
  return (
    <CardBase title={title}>
      <MKBox sx={sx?.textContainer}>
        <MKTypography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
          {text || 'No hay información disponible'}
        </MKTypography>
      </MKBox>
    </CardBase>
  );
}
