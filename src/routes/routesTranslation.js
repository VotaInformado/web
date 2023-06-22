import PATHS from 'routes/paths';

const routesTranslation = {
  [PATHS.home]: 'Casita',
  [PATHS.childrenRoute]: 'Hijo',
};

function translateRoute(path, defaultValue) {
  return path in routesTranslation ? routesTranslation[path] : defaultValue;
}

function makeAndLabelRoute(pathnames, value, index) {
  const currentPath = `/${pathnames.slice(0, index + 1).join('/')}`;
  return {
    label: translateRoute(currentPath, value),
    route: currentPath,
  };
}

// Returns an array of objects with { label, route }
// from the current pathname
function makeBreadcrumbRoutes(pathname) {
  const pathnames = pathname.split('/').filter((x) => x);
  return pathnames.map((value, index) => makeAndLabelRoute(pathnames, value, index));
}

export { makeBreadcrumbRoutes, translateRoute };
