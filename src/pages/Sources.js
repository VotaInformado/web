import React from "react";

// Router
import { Link } from "react-router-dom";
// Components
import MKTypography from "components/MKTypography";
import { Stack, List, ListItem } from "@mui/material";
import PageBase from "pages/PageBase";
import CardBase from "components/Cards/CardBase";

const SOURCES = [
  {
    name: "Declaraciones juradas de patrimonio de oficiales públicos",
    url: "http://datos.jus.gob.ar/dataset/declaraciones-juradas-patrimoniales-integrales",
  },
  {
    name: "Autores de proyectos de ley del Senado de la Nación",
    url: "https://www.senado.gob.ar/parlamentario/parlamentaria/",
  },
  {
    name: "Autores de proyectos de ley de la Cámara de Diputados",
    url: "https://www.diputados.gov.ar/proyectos/",
  },
  {
    name: "Órdenes del día de la Cámara de Diputados",
    url: "https://www2.hcdn.gob.ar/secparl/dcomisiones/s_od/buscador.html",
  },
  {
    name: "Cargos históricos de la Cámara de Diputados",
    url: "https://datos.hcdn.gob.ar:443/dataset/a80e0fa7-d73a-4ed1-9dec-80465e368951/resource/169de2eb-465f-4007-a4c2-39a5ba4c0df3/download/diputados2.1.csv",
  },
  {
    name: "Cargos históricos del Senado de la Nación",
    url: "https://www.senado.gob.ar/micrositios/DatosAbiertos/ExportarListadoSenadoresHistorico/json",
  },
  {
    name: "Composición actual de la Cámara de Diputados",
    url: "https://www.diputados.gov.ar/system/modules/ar.gob.hcdn.diputados/formatters/generar-lista-diputados.csv",
  },
  {
    name: "Composición actual del Senado de la Nación",
    url: "https://www.senado.gob.ar/micrositios/DatosAbiertos/ExportarListadoSenadores/json",
  },
  {
    name: "Proyectos de ley iniciados en la Cámara de Diputados",
    url: "https://www.diputados.gov.ar/proyectos",
  },
  {
    name: "Proyectos de ley iniciados en el Senado de la Nación",
    url: "https://www.senado.gob.ar/parlamentario/parlamentaria",
  },
  {
    name: "Estados de proyectos - Cámara de Diputados",
    url: "https://datos.hcdn.gob.ar/dataset/proyectos-parlamentarios/resource/22b2d52c-7a0e-426b-ac0a-a3326c388ba6",
  },
  {
    name: "Textos de proyectos - Cámara de Diputados",
    url: "https://www.hcdn.gob.ar/folio-cgi-bin/om_isapi.dll",
  },
  {
    name: "Leyes sancionadas",
    url: "https://www.argentina.gob.ar/normativa/buscar?jurisdiccion=nacional&tipo_norma=leyes",
  },
  {
    name: "Fotos de perfil de senadores actuales",
    url: "https://www.senado.gob.ar/senadores/listados/listaSenadoRes",
  },
  {
    name: "Votos de la Cámara de Diputados",
    url: "https://votaciones.hcdn.gob.ar/votaciones/search",
  },
  {
    name: "Votos del Senado de la Nación",
    url: "https://www.senado.gob.ar/votaciones/actas",
  },
];

export default function Sources() {
  return (
    <PageBase>
      <Stack justifyContent="center" alignItems="center" spacing={4} my={4}>
        <MKTypography variant="h4" mb={2}>
          Fuentes utilizadas
        </MKTypography>
        <CardBase sx={{ p: 3 }}>
          <MKTypography variant="body1" align="center" mb={4}>
            Las fuentes de los datos utilizados en esta aplicación son:
          </MKTypography>
          <List sx={{ listStyleType: "disc" }}>
            {SOURCES.map((source) => (
              <ListItem key={source} sx={{ display: "list-item" }}>
                <MKTypography variant="body2">
                  {source.name}:&nbsp;
                  <Link target="_blank" to={source.url}>
                    {source.url}
                  </Link>
                </MKTypography>
              </ListItem>
            ))}
          </List>
        </CardBase>
      </Stack>
    </PageBase>
  );
}
