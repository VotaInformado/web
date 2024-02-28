import React from "react";

import PropTypes from "prop-types";

// Components
import CardBase from "components/Cards/CardBase";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import NoData from "components/NoData";

TextCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
  sx: PropTypes.shape({
    textContainer: PropTypes.object,
  }),
};

export default function TextCard({ title, text, link, sx }) {
  const linkAction = {
    route: link,
    tooltip: "Ver original",
    label: "Ver original",
    icon: "open_in_new",
    openInNewTab: true,
  };
  return (
    <CardBase title={title} action={link && linkAction}>
      <MKBox sx={sx?.textContainer}>
        {Boolean(text.trim()) ? (
          <MKTypography variant="body2" sx={{ whiteSpace: "pre-line" }}>
            {text}
          </MKTypography>
        ) : (
          <NoData />
        )}
      </MKBox>
    </CardBase>
  );
}
