const PATHS = {
  root: '/',
  home: '/home',
  legislator: '/legislador/:id',
  legislatorSearch: '/buscar/legislador',
  project: '/proyecto/:id',
  notFound: '404',
};

function path(key, params) {
  let path = PATHS[key];
  if (params) {
    Object.keys(params).forEach((param) => {
      path = path.replace(`:${param}`, params[param]);
    });
  }
  return path;
}

export default PATHS;
export { path };
