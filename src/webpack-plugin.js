const {default: InjectPlugin} = require('webpack-inject-plugin');

function loader(options) {
  return () => {
    const { shared = [], systemJsInstanceName = "window.System", embedSystemJs = true, extras = ['amd','named-exports','transform'] } = options;

    // Creating 
    // Remark: arrow function is not supported in IE
    const packageMaps = shared.map((packageName) => {
      return `"${packageName}": function() {return import("${packageName}");}`;
    })
    
    return `
${ !!embedSystemJs && 'require("systemjs/dist/system");'}
${ !!embedSystemJs && !!extras && extras.length >0 && extras.map( extraName => `require("systemjs/dist/extras/${extraName}");`).join("\n")}
require("__package_name__");

var imports = {
${packageMaps.join(",\n")}
};

${systemJsInstanceName}.appendImportMap(imports);
`;
  };
}
 
module.exports = class SystemJsWebpackChunkInteropPlugin {
  constructor(options) {
    this.options = options;
  }
 
  apply(compiler) {
    new InjectPlugin(loader(this.options)).apply(compiler);
  }
}