import React from "react";

import PropTypes from "prop-types";

import MKTypography from "components/MKTypography";
import { Card, CardMedia, CardContent } from "@mui/material";

NewsCard.propTypes = {
  newsPiece: PropTypes.shape({
    title: PropTypes.string,
    pubDate: PropTypes.string,
    link: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default function NewsCard({ newsPiece }) {
  return (
    <Card>
      <CardContent style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <MKTypography variant="body2" color="text.secondary" fontSize="small">
            {newsPiece.pubDate}
          </MKTypography>
        </div>
        <a href={newsPiece.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <MKTypography variant="h6" component="div" style={{ width: "100%", marginBottom: "8px" }}>
            {newsPiece.title}
          </MKTypography>
        </a>
        <CardMedia
          component="img"
          height={250}
          image={newsPiece.image_url || DEFAULT_IMAGE_URL}
          alt={newsPiece.title}
          style={{ marginBottom: "8px" }}
        />
        <MKTypography variant="body2" color="text.secondary" style={{ marginBottom: "8px" }}>
          {newsPiece.description}
        </MKTypography>
      </CardContent>
    </Card>
  );
}
