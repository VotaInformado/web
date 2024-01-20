import React from "react";

// Components
import PageBase from "pages/PageBase";
import MKTypography from "components/MKTypography";
import SvgIcon from "@mui/material/SvgIcon";
import Stack from "@mui/material/Stack";
import MKButton from "components/MKButton";
import CardBase from "components/Cards/CardBase";
import Grid from "@mui/material/Grid";
// Images
import { ReactComponent as LogoDiputados } from "assets/images/LogoDiputados.svg";
import LogoSenadores2 from "assets/images/LogoSenadores2.png";
import Recruiting from "assets/images/recruiting.png";
import Group from "assets/images/group.png";
import Law from "assets/images/law.png";
import Lamp from "assets/images/lamp.png";
// Routes
import PATHS from "routes/paths";

export default function Home() {
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
        <Grid item xs={12} md1={3}>
          <CardBase>
            <Stack alignItems="center" justifyContent="space-around" spacing={4} sx={{ height: "400px" }}>
              <img src={Recruiting} style={{ width: "auto", height: "30%" }} />
              <MKTypography variant="body1" align="center">
                Informate sobre los legisladores nacionales, sus proyectos de ley y su actividad en el Congreso.
              </MKTypography>
              <MKButton variant="gradient" color="primary" href={PATHS.legislatorSearch} size="large">
                Ver Legisladores
              </MKButton>
            </Stack>
          </CardBase>
        </Grid>
        <Grid item xs={12} md1={3}>
          <CardBase>
            <Stack alignItems="center" justifyContent="space-around" spacing={4} sx={{ height: "400px" }}>
              <img src={Group} style={{ width: "30%", height: "auto" }} />
              <MKTypography variant="body1" align="center">
                Conocé cómo votaron y qué proyectos presentaron los distintos partidos.
              </MKTypography>
              <MKButton variant="gradient" color="primary" href={PATHS.partySearch} size="large">
                Ver Partidos
              </MKButton>
            </Stack>
          </CardBase>
        </Grid>
        <Grid item xs={12} md1={3} sx={{ height: "400px" }}>
          <CardBase>
            <Stack alignItems="center" justifyContent="space-around" spacing={4} sx={{ height: "400px" }}>
              <img src={Law} style={{ width: "30%", height: "auto" }} />
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
              <MKButton variant="gradient" color="primary" href={PATHS.projectSearch} size="large">
                Ver Proyectos
              </MKButton>
            </Stack>
          </CardBase>
        </Grid>
        <Grid item xs={12} md1={3}>
          <CardBase>
            <Stack alignItems="center" justifyContent="space-around" spacing={4} sx={{ height: "400px" }}>
              <img src={Lamp} style={{ width: "30%", height: "auto" }} />
              <MKTypography variant="body1" align="center">
                Predecí cómo votaría un legislador en un determinado proyecto. O cómo sería el resultado en una cámara.
              </MKTypography>
              <MKButton variant="gradient" color="primary" href={PATHS.partySearch} size="large">
                Predecir Votos
              </MKButton>
            </Stack>
          </CardBase>
        </Grid>
        <Grid item xs={12} md1={8}>
          <CardBase title="Últimas noticias">
            <Stack alignItems="center" justifyContent="space-around" spacing={4} sx={{ height: "400px" }}>
              <MKButton variant="gradient" color="primary" href={PATHS.prediction} size="large">
                Predecir Votos
              </MKButton>
            </Stack>
          </CardBase>
        </Grid>
      </Grid>
    </PageBase>
  );
}
