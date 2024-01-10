import React, { useEffect, useState } from "react";

// Components
import { Card, Grid, CardMedia, CardContent } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import PageBase from "pages/PageBase";
import MKTypography from "components/MKTypography";
import NewsCard from "./components/Cards/NewsCard";

// Adapters
import { getNews } from "adapters/newsAdapter";
// Paths and routes
import { useParams, generatePath } from "react-router-dom";
import { set } from "lodash";

const DEFAULT_IMAGE_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaeL3nmph1Y7o4u-WwTLtObg0f_UIt1W2Igaj5WQPk7cCOIlm3pfgLrPLeam61zBVuoY&usqp=CAU";

const newsData = [
  {
    title: "Sample News 1",
    imageUrl: "https://via.placeholder.com/150", // Sample image URL
    publicationDate: "January 1, 2024",
  },
  {
    title: "Sample News 2",
    imageUrl: "https://via.placeholder.com/150", // Sample image URL
    publicationDate: "January 2, 2024",
  },
  // ... add more news items as needed
];

export default function News() {
  const [news, setNews] = useState({});
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getNews()
      .then((res) => {
        setNews(res);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageBase>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <Grid container spacing={2}>
            {/* First vertical stack */}
            <Grid item xs={6}>
              {[...Array(5)].map((_, index) => (
                <Grid item key={index}>
                  <NewsCard newsPiece={news[index]} />
                </Grid>
              ))}
            </Grid>

            {/* Second vertical stack */}
            <Grid item xs={6}>
              {[...Array(5)].map((_, index) => (
                <Grid item key={index}>
                  <NewsCard newsPiece={news[index + 5]} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      )}
    </PageBase>
  );
}
