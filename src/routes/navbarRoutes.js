import { Icon } from '@mui/material';
import PATHS from './paths';

const navbarRoutes = [
  {
    name: 'Legisladores',
    icon: <Icon>person</Icon>,
    route: PATHS.legislatorSearch,
  },
  {
    name: 'Partidos',
    icon: <Icon>groups</Icon>,
  },
  {
    name: 'Leyes',
    icon: <Icon>account_balance</Icon>,
    collapse: [
      {
        name: 'Leyes sancionadas',
        route: '/legislacion/leyes-sancionadas',
      },
      {
        name: 'Proyectos de Ley',
        route: '/legislacion/proyectos-de-ley',
      },
    ],
  },
];

export default navbarRoutes;
