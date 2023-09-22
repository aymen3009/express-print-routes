const TERMINAL_ANSI = {
    Reset: "\x1b[0m",
  
    FgLightGreen: "\x1b[1;32m",
    FgLightBlue: "\x1b[1;34m",
  };
  
  const printRoutes = (app) => {
    function print(path, layer) {
      if (layer.route) {
        layer.route.stack.forEach(
          print.bind(null, path.concat(split(layer.route.path))),
        );
      } else if (layer.name === "router" && layer.handle.stack) {
        layer.handle.stack.forEach(
          print.bind(null, path.concat(split(layer.regexp))),
        );
      } else if (layer.method) {
        console.log(
          "%s%s%s %s/%s%s",
          TERMINAL_ANSI.FgLightGreen,
          layer.method.toUpperCase().padEnd(10),
          TERMINAL_ANSI.Reset,
          TERMINAL_ANSI.FgLightBlue,
          path.concat(split(layer.regexp)).filter(Boolean).join("/"),
          TERMINAL_ANSI.Reset,
        );
      }
    }
  
    function split(thing) {
      if (typeof thing === "string") {
        return thing.split("/");
      } else if (thing.fast_slash) {
        return "";
      } else {
        var match = thing
          .toString()
          .replace("\\/?", "")
          .replace("(?=\\/|$)", "$")
          //eslint-disable-next-line
          .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
        return match
          ? match[1].replace(/\\(.)/g, "$1").split("/")
          : "<complex:" + thing.toString() + ">";
      }
    }
  
    app._router.stack.forEach(print.bind(null, []));
    return function (req, res, next) {
      next();
    };
  };
  
  module.exports = printRoutes;
  