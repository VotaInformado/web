import { Icon } from "@mui/material";
import PATHS from "./paths";

const navbarRoutes = [
  {
    name: "Legisladores",
    icon: <Icon>person</Icon>,
    route: PATHS.legislatorSearch,
  },
  {
    name: "Partidos",
    icon: <Icon>groups</Icon>,
    route: PATHS.partySearch,
  },
  {
    name: "Leyes",
    icon: <Icon>account_balance</Icon>,
    route: PATHS.lawSearch,
  },
  {
    name: "Proyectos de Ley",
    icon: <Icon>article</Icon>,
    route: PATHS.projectSearch,
  },
];

export default navbarRoutes;
