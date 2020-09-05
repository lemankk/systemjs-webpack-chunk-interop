(function (global) {
  const systemPrototype = global.System.constructor.prototype;

  const asyncImportPrefix = "systemjs://m/";
  const getUrl = (id) => asyncImportPrefix + id;
  systemPrototype.appendImportMap = async function (packages) {
    const loader = this;
    loader.asyncMap = loader.asyncMap || {};
    loader.asyncMap = {
      ...loader.asyncMap,
      ...packages,
    };

    // creating import map from package
    const packageNames = Object.keys(packages);
    const sjsMapElm = document.createElement("script");

    // meet import map rules
    sjsMapElm.type = "systemjs-importmap";

    const packageMap = {};
    for (const name of packageNames) {
      // Use it directly if the package already provide an url, other assume that is a internal url with import syntax
      packageMap[name] = typeof packageNames[name] === "string" ? packageNames[name] : getUrl(name);
    }

    sjsMapElm.innerText = JSON.stringify({
      imports: packageMap,
    });
    document.head.appendChild(sjsMapElm);
    return loader.prepareImport(true);
  };
  const existingHook = systemPrototype.instantiate;
  systemPrototype.instantiate = function (url, parentUrl) {
    var loader = this;

    // use original loader
    if (url.indexOf(asyncImportPrefix) !== 0) {
      if (/^https?:/.test(url)) {
        return import(/* webpackIgnore: true */ url);
      } else {
        return existingHook.apply(loader, arguments);
      }
    }
    var packageName = url.substr(asyncImportPrefix.length);
    return new Promise(async (resolve, reject) => {
      try {
        const register = loader.getRegister();
        const importer = loader.asyncMap[packageName];

        // Using Webpack import()
        const context = await importer();

        loader.set(url, context);
        resolve(register);
      } catch (error) {
        reject(error);
      }
    });
  };
  // eslint-disable-next-line
})(typeof self !== "undefined" ? self : global);
