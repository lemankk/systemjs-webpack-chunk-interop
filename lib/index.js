'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

(function (global) {
  var systemPrototype = global.System.constructor.prototype;
  var asyncImportPrefix = "systemjs://m/";

  var getUrl = function getUrl(id) {
    return asyncImportPrefix + id;
  };

  systemPrototype.appendImportMap = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(packages) {
      var loader, packageNames, sjsMapElm, packageMap, _i, _packageNames, name;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              loader = this;
              loader.asyncMap = loader.asyncMap || {};
              loader.asyncMap = _objectSpread2(_objectSpread2({}, loader.asyncMap), packages); // creating import map from package

              packageNames = Object.keys(packages);
              sjsMapElm = document.createElement("script"); // meet import map rules

              sjsMapElm.type = "systemjs-importmap";
              packageMap = {};

              for (_i = 0, _packageNames = packageNames; _i < _packageNames.length; _i++) {
                name = _packageNames[_i];
                // Use it directly if the package already provide an url, other assume that is a internal url with import syntax
                packageMap[name] = typeof packages[name] === "string" ? packages[name] : getUrl(name);
              }

              sjsMapElm.innerText = JSON.stringify({
                imports: packageMap
              });
              document.head.appendChild(sjsMapElm);
              return _context.abrupt("return", loader.prepareImport(true));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var existingHook = systemPrototype.instantiate;

  systemPrototype.instantiate = function (url, parentUrl) {
    var loader = this; // use original loader

    if (url.indexOf(asyncImportPrefix) !== 0) {
      return existingHook.apply(loader, arguments);
    }

    var packageName = url.substr(asyncImportPrefix.length);
    return new Promise( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
        var register, importer, context;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                register = loader.getRegister();
                importer = loader.asyncMap[packageName]; // Using Webpack import()

                _context2.next = 5;
                return importer();

              case 5:
                context = _context2.sent;
                loader.set(url, context);
                resolve(register);
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);
                reject(_context2.t0);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 10]]);
      }));

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }());
  }; // eslint-disable-next-line

})(typeof self !== "undefined" ? self : global);
//# sourceMappingURL=index.js.map
