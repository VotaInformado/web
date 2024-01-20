import React from "react";

import PropTypes from "prop-types";

import MKTypography from "components/MKTypography";
import { Card, CardMedia, CardContent, Link, CardHeader } from "@mui/material";

const DEFAULT_IMAGE_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaeL3nmph1Y7o4u-WwTLtObg0f_UIt1W2Igaj5WQPk7cCOIlm3pfgLrPLeam61zBVuoY&usqp=CAU";

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
    <Card sx={{ boxShadow: 4 }}>
      <CardContent style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <MKTypography variant="body2" color="text.secondary" fontSize="small" align="right">
            {newsPiece.pubDate}
          </MKTypography>
          <MKTypography variant="h6" component={Link} href={newsPiece.link} target="_blank" rel="noopener noreferrer">
            {newsPiece.title}
          </MKTypography>
        </div>
        <CardMedia
          component="img"
          height={250}
          image={newsPiece.image_url || DEFAULT_IMAGE_URL}
          alt={newsPiece.title}
          sx={{ m: 0 }}
        />
        <MKTypography variant="body2" color="text.secondary">
          {newsPiece.description}
        </MKTypography>
      </CardContent>
    </Card>
  );
}
