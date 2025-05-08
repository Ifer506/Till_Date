"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeBabelParseConfig = normalizeBabelParseConfig;
exports.normalizeBabelParseConfigSync = normalizeBabelParseConfigSync;
const babel = require("./babel-core.cjs");
const ESLINT_VERSION = require("../utils/eslint-version.cjs");
function getParserPlugins(babelOptions) {
  const babelParserPlugins = babelOptions.parserOpts?.plugins ?? [];
  const estreeOptions = {
    classFeatures: ESLINT_VERSION >= 8
  };
  for (const plugin of babelParserPlugins) {
    if (Array.isArray(plugin) && plugin[0] === "estree") {
      Object.assign(estreeOptions, plugin[1]);
      break;
    }
  }
  return [["estree", estreeOptions], ...babelParserPlugins];
}
function normalizeParserOptions(options) {
  return Object.assign({
    sourceType: options.sourceType,
    filename: options.filePath
  }, options.babelOptions, {
    parserOpts: Object.assign({}, {}, {
      allowReturnOutsideFunction: options.ecmaFeatures?.globalReturn ?? false
    }, options.babelOptions.parserOpts, {
      plugins: getParserPlugins(options.babelOptions),
      attachComment: false,
      ranges: true,
      tokens: true
    }),
    caller: Object.assign({
      name: "@babel/eslint-parser"
    }, options.babelOptions.caller)
  });
}
function validateResolvedConfig(config, options, parseOptions) {
  if (config !== null) {
    if (options.requireConfigFile !== false) {
      if (!config.hasFilesystemConfig()) {
        let error = `No Babel config file detected for ${config.options.filename}. Either disable config file checking with requireConfigFile: false, or configure Babel so that it can find the config files.`;
        if (config.options.filename.includes("node_modules")) {
          error += `\nIf you have a .babelrc.js file or use package.json#babel, keep in mind that it's not used when parsing dependencies. If you want your config to be applied to your whole app, consider using babel.config.js or babel.config.json instead.`;
        }
        throw new Error(error);
      }
    }
    if (config.options) return config.options;
  }
  return getDefaultParserOptions(parseOptions);
}
function getDefaultParserOptions(options) {
  return Object.assign({
    plugins: []
  }, options, {
    babelrc: false,
    configFile: false,
    browserslistConfigFile: false,
    ignore: null,
    only: null
  });
}
async function normalizeBabelParseConfig(options) {
  const parseOptions = normalizeParserOptions(options);
  const config = await babel.loadPartialConfigAsync(parseOptions);
  return validateResolvedConfig(config, options, parseOptions);
}
function normalizeBabelParseConfigSync(options) {
  const parseOptions = normalizeParserOptions(options);
  const config = babel.loadPartialConfigSync(parseOptions);
  return validateResolvedConfig(config, options, parseOptions);
}

//# sourceMappingURL=configuration.cjs.map
