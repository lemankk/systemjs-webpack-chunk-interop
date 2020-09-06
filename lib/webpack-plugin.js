'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var _require = require('webpack-inject-plugin'),
    InjectPlugin = _require["default"],
    ENTRY_ORDER = _require.ENTRY_ORDER;

function loader(options) {
  return function () {
    var _options$shared = options.shared,
        shared = _options$shared === void 0 ? [] : _options$shared,
        _options$systemJsInst = options.systemJsInstanceName,
        systemJsInstanceName = _options$systemJsInst === void 0 ? "window.System" : _options$systemJsInst,
        _options$embedSystemJ = options.embedSystemJs,
        embedSystemJs = _options$embedSystemJ === void 0 ? true : _options$embedSystemJ,
        _options$extras = options.extras,
        extras = _options$extras === void 0 ? ['amd', 'named-exports', 'transform'] : _options$extras; // Creating 
    // Remark: arrow function is not supported in IE

    var packageMaps = shared.map(function (packageName) {
      return "\"".concat(packageName, "\": function() {return import(\"").concat(packageName, "\");}");
    });
    return "\n".concat(!!embedSystemJs && 'require("systemjs/dist/system");', "\n").concat(!!embedSystemJs && !!extras && extras.length > 0 && extras.map(function (extraName) {
      return "require(\"systemjs/dist/extras/".concat(extraName, "\");");
    }).join("\n"), "\nrequire(\"systemjs-webpack-chunk-interop\");\n\nvar imports = {\n").concat(packageMaps.join(",\n"), "\n};\n\n").concat(systemJsInstanceName, ".appendImportMap(imports);\n");
  };
}

module.exports = /*#__PURE__*/function () {
  function SystemJsWebpackChunkInteropPlugin(options) {
    _classCallCheck(this, SystemJsWebpackChunkInteropPlugin);

    this.options = options;
  }

  _createClass(SystemJsWebpackChunkInteropPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      new InjectPlugin(loader(this.options), {
        entryOrder: ENTRY_ORDER.First
      }).apply(compiler);
    }
  }]);

  return SystemJsWebpackChunkInteropPlugin;
}();
//# sourceMappingURL=webpack-plugin.js.map
