import React, { useState, useEffect } from "react";

// Components
import PageBase from "pages/PageBase";
import MKTypography from "components/MKTypography";
import SvgIcon from "@mui/material/SvgIcon";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import CardBase from "components/Cards/CardBase";
import Grid from "@mui/material/Grid";
import HomeCard from "pages/Home/components/HomeCard";
import NewsCard from "pages/News/components/Cards/NewsCard";
// Images
import { ReactComponent as LogoDiputados } from "assets/images/LogoDiputados.svg";
import LogoSenadores2 from "assets/images/LogoSenadores2.png";
import Recruiting from "assets/images/recruiting.png";
import Group from "assets/images/group.png";
import Law from "assets/images/law.png";
import Lamp from "assets/images/lamp.png";
// Routes
import PATHS from "routes/paths";
// Adaptres
import { getNews } from "adapters/newsAdapter";

export default function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews().then((res) => {
      setNews(res);
    });
  }, []);

  return (
    <PageBase>
      <MKTypography variant="h3" align="center" gutterBottom>
        ¡Bienvenido a Votá Informado!
      </MKTypography>
      <MKTypography variant="body1" align="center" gutterBottom>
        Acá vas a poder buscar información sobre los legisladores nacionales.
      </MKTypography>
      <Stack direction="row" spacing={8} justifyContent="center" my={6}>
        <SvgIcon component={LogoDiputados} inheritViewBox sx={{ width: "20%", height: "auto" }} />
        <img src={LogoSenadores2} style={{ width: "20%", height: "auto" }} />
      </Stack>
      <Grid container direction="row" spacing={2} justifyContent="center">
        <Grid item xs={12} md1={6} lg={3}>
          <HomeCard image={Recruiting} buttonText="Ver Legisladores" buttonLink={PATHS.legislatorSearch}>
            <MKTypography variant="body1" align="center">
              Informate sobre los legisladores nacionales, sus proyectos de ley y su actividad en el Congreso.
            </MKTypography>
          </HomeCard>
        </Grid>
        <Grid item xs={12} md1={6} lg={3}>
          <HomeCard image={Group} buttonText="Ver Partidos" buttonLink={PATHS.partySearch}>
            <MKTypography variant="body1" align="center">
              Conocé cómo votaron y qué proyectos presentaron los distintos partidos.
            </MKTypography>
          </HomeCard>
        </Grid>
        <Grid item xs={12} md1={6} lg={3}>
          <HomeCard image={Law} buttonLink={PATHS.projectSearch} buttonText="Ver Proyectos">
            <MKTypography variant="body1" align="center">
              Accedé a
              <MKTypography fontWeight="bold" display="inline">
                &nbsp;resúmenes&nbsp;
              </MKTypography>
              de los proyectos de ley, y
              <MKTypography fontWeight="bold" display="inline">
                &nbsp;predecí&nbsp;
              </MKTypography>
              cómo votarán los legisladores.
            </MKTypography>
          </HomeCard>
        </Grid>
        <Grid item xs={12} md1={6} lg={3}>
          <HomeCard image={Lamp} buttonText="Predecir Votos" buttonLink={PATHS.prediction}>
            <MKTypography variant="body1" align="center">
              Predecí cómo votaría un legislador en un determinado proyecto.
            </MKTypography>
          </HomeCard>
        </Grid>
        <Grid item xs={12} md1={8}>
          <CardBase title="Últimas noticias">
            <Stack
              alignItems="center"
              justifyContent="flex-start"
              spacing={2}
              sx={{ height: "600px", overflow: "auto", padding: 1 }}>
              {news?.splice(0, 5).map((newsPiece) => (
                <NewsCard key={newsPiece.title} newsPiece={newsPiece} />
              ))}
              {(!news || news.length == 0) && (
                <Stack alignItems="center" justifyContent="center" height="90%">
                  <MKTypography variant="body1">No pudimos acceder a las últimas noticias 🙁</MKTypography>
                  <Icon fontSize="large">newspaper_icon</Icon>
                </Stack>
              )}
            </Stack>
          </CardBase>
        </Grid>
      </Grid>
    </PageBase>
  );
}
