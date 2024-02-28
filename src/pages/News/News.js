import React, { useEffect, useState } from "react";

// Components
import { Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import PageBase from "pages/PageBase";
import NewsCard from "./components/Cards/NewsCard";

// Adapters
import { getNews } from "adapters/newsAdapter";
import { keys } from "lodash";

export default function News() {
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);

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
            {keys(news).length > 0 &&
              [...Array(10)].map((_, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <NewsCard newsPiece={news[index]} />
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </PageBase>
  );
}
