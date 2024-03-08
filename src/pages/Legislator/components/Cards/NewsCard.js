// Components
import React from "react";

import PropTypes from "prop-types";

import MKTypography from "components/MKTypography";
import CardBase from "components/Cards/CardBase";
import { CardActionArea, CardMedia, CardContent, Grid, Typography } from "@mui/material";

const EmptyNewsCard = () => {
  return (
    <CardBase title="Noticias relacionadas" spacing={2} style={{ height: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MKTypography variant="body2" sx={{ fontStyle: "italic" }}>
            No encontramos noticias relacionadas a este legislador
          </MKTypography>
        </Grid>
      </Grid>
    </CardBase>
  );
};

IndividualNewsCard.propTypes = {
  newsPiece: PropTypes.objectOf({
    title: PropTypes.string,
    link: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

function IndividualNewsCard({ newsPiece }) {
  return (
    <Grid>
      <CardActionArea component="a" href={newsPiece.link} target="_blank" rel="noopener noreferrer">
        <CardMedia component="img" alt={newsPiece.title} height="120" image={newsPiece.image_url} />
        <CardContent>
          <Typography variant="h6" component="div" style={{ fontSize: "12px" }}>
            {newsPiece.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ fontSize: "12px" }}>
            {newsPiece.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Grid>
  );
}

LegislatorNewsCard.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default function LegislatorNewsCard({ news }) {
  return !news || news.length === 0 ? (
    <EmptyNewsCard />
  ) : (
    <CardBase title="Noticias relacionadas" spacing={2} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Grid container spacing={2}>
        {news.map((newsPiece) => (
          <Grid key={newsPiece.id} item xs={4}>
            <IndividualNewsCard newsPiece={newsPiece} />
          </Grid>
        ))}
      </Grid>
    </CardBase>
  );
}
