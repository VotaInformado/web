import React, { useEffect, useState } from "react";

// Components
import { Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import PageBase from "pages/PageBase";
import NewsCard from "./components/Cards/NewsCard";

// Adapters
import { getNews } from "adapters/newsAdapter";
// Paths and routes
import { useParams } from "react-router-dom";
import { keys } from "lodash";

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
            {/* <Grid item xs={6}> */}
            {keys(news).length > 0 &&
              [...Array(5)].map((_, index) => (
                <Grid item xs={6} key={index}>
                  <NewsCard newsPiece={news[index]} />
                </Grid>
              ))}

            {/* Second vertical stack */}
            {keys(news).length > 0 &&
              [...Array(5)].map((_, index) => (
                <Grid item xs={6} key={index}>
                  <NewsCard newsPiece={news[index + 5]} />
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </PageBase>
  );
}
