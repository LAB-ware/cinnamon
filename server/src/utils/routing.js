const getRoutesOfLayer = (path, layer) => {
  if (layer.method) {
    return [`${layer.method.toUpperCase()} ${path}`];
  }
  if (layer.route) {
    return getRoutesOfLayer(
      path + split(layer.route.path),
      layer.route.stack[0]
    );
  }
  if (layer.name === "router" && layer.handle.stack) {
    let routes = [];
    layer.handle.stack.forEach((stackItem) => {
      routes = routes.concat(
        getRoutesOfLayer(path + split(layer.regexp), stackItem)
      );
    });
    return routes;
  }
  return [];
};

const split = (thing) => {
  if (typeof thing === "string") {
    return thing;
  }
  if (thing.fast_slash) {
    return "";
  }
  const match = thing
    .toString()
    .replace("\\/?", "")
    .replace("(?=\\/|$)", "$")
    .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
  return match
    ? match[1].replace(/\\(.)/g, "$1")
    : `<complex:${thing.toString()}>`;
};

export const printRoutes = (app) => {
  let routes = [];
  app._router.stack.forEach((layer) => {
    routes = routes.concat(getRoutesOfLayer("", layer));
  });

  console.log("\nApp Routes:");
  routes.forEach((route) => console.log(`\t${route}`));
  console.log("\n");
};
