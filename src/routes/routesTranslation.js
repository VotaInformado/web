import PATHS from "routes/paths";
import { matchPath } from "react-router-dom";

const routesTranslation = {
  [PATHS.home]: "Inicio",
  [PATHS.legislatorSearch]: "Búsqueda de legisladores",
  [PATHS.legislator]: "Legislador",
  [PATHS.project]: "Proyecto de ley",
  [PATHS.notFound]: "404",
};

function translateRoute(path, defaultValue) {
  for (const route in routesTranslation) {
    if (matchPath(route, path)) {
      return routesTranslation[route];
    }
  }
  return defaultValue;
}

function makeAndLabelRoute(pathnames, value, index) {
  const currentPath = `/${pathnames.slice(0, index + 1).join("/")}`;
  return {
    label: translateRoute(currentPath, value),
    route: currentPath,
  };
}

// Returns an array of objects with { label, route }
// from the current pathname
function makeBreadcrumbRoutes(pathname) {
  const pathnames = pathname.split("/").filter((x) => x);
  return pathnames.map((value, index) => makeAndLabelRoute(pathnames, value, index));
}

export { makeBreadcrumbRoutes, translateRoute };
