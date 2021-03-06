"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require(`v8-compile-cache`);

const webpack = require('webpack'); 
const fs = require(`fs-extra`);

const path = require(`path`);

const dotenv = require(`dotenv`);

const FriendlyErrorsWebpackPlugin = require(`friendly-errors-webpack-plugin`);

const _require = require(`../redux`),
      store = _require.store;

const _require2 = require(`../redux/actions`),
      actions = _require2.actions;

const debug = require(`debug`)(`gatsby:webpack-config`);

const report = require(`gatsby-cli/lib/reporter`);

const _require3 = require(`./path`),
      withBasePath = _require3.withBasePath;

const apiRunnerNode = require(`./api-runner-node`);

const createUtils = require(`./webpack-utils`);

const hasLocalEslint = require(`./local-eslint-config-finder`); // Four stages or modes:
//   1) develop: for `gatsby develop` command, hot reload and CSS injection into page
//   2) develop-html: same as develop without react-hmre in the babel config for html renderer
//   3) build-javascript: Build JS and CSS chunks for production
//   4) build-html: build all HTML files


module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (program, directory, suppliedStage, webpackPort = 1500) {
    const directoryPath = withBasePath(directory);
    process.env.GATSBY_BUILD_STAGE = suppliedStage; // We combine develop & develop-html stages for purposes of generating the
    // webpack config.

    const stage = suppliedStage;

    const _ref2 = yield createUtils({
      stage,
      program
    }),
          rules = _ref2.rules,
          loaders = _ref2.loaders,
          plugins = _ref2.plugins;

    function processEnv(stage, defaultNodeEnv) {
      debug(`Building env for "${stage}"`);
      const env = process.env.NODE_ENV ? process.env.NODE_ENV : `${defaultNodeEnv}`;
      const envFile = path.join(process.cwd(), `./.env.${env}`);
      let parsed = {};

      try {
        parsed = dotenv.parse(fs.readFileSync(envFile, {
          encoding: `utf8`
        }));
      } catch (err) {
        if (err.code !== `ENOENT`) {
          report.error(`There was a problem processing the .env file`, err);
        }
      }

      const envObject = Object.keys(parsed).reduce((acc, key) => {
        acc[key] = JSON.stringify(parsed[key]);
        return acc;
      }, {});
      const gatsbyVarObject = Object.keys(process.env).reduce((acc, key) => {
        if (key.match(/^GATSBY_/)) {
          acc[key] = JSON.stringify(process.env[key]);
        }

        return acc;
      }, {}); // Don't allow overwriting of NODE_ENV, PUBLIC_DIR as to not break gatsby things

      envObject.NODE_ENV = JSON.stringify(env);
      envObject.PUBLIC_DIR = JSON.stringify(`${process.cwd()}/public`);
      envObject.BUILD_STAGE = JSON.stringify(stage);
      return Object.assign(envObject, gatsbyVarObject);
    }

    function getHmrPath() {
      let hmrBasePath = `${program.ssl ? `https` : `http`}://${program.host}:${webpackPort}/`;
      const hmrSuffix = `__webpack_hmr&reload=true&overlay=false`;

      if (process.env.GATSBY_WEBPACK_PUBLICPATH) {
        const pubPath = process.env.GATSBY_WEBPACK_PUBLICPATH;

        if (pubPath.substr(-1) === `/`) {
          hmrBasePath = pubPath;
        } else {
          hmrBasePath = `${pubPath}/`;
        }
      }

      return hmrBasePath + hmrSuffix;
    }

    debug(`Loading webpack config for stage "${stage}"`);

    function getOutput() {
      switch (stage) {
        case `develop`:
          return {
            path: directory,
            filename: `[name].js`,
            // Add /* filename */ comments to generated require()s in the output.
            pathinfo: true,
            // Point sourcemap entries to original disk location (format as URL on Windows)
            publicPath: process.env.GATSBY_WEBPACK_PUBLICPATH || `${program.ssl ? `https` : `http`}://${program.host}:${webpackPort}/`,
            devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, `/`),
            // Avoid React cross-origin errors
            // See https://reactjs.org/docs/cross-origin-errors.html
            crossOriginLoading: `anonymous`,
       globalObject: `typeof self !== 'undefined' ? self : this`,
          };

        case `build-html`:
        case `develop-html`:
          // A temp file required by static-site-generator-plugin. See plugins() below.
          // Deleted by build-html.js, since it's not needed for production.
          return {
            path: directoryPath(`public`),
            filename: `render-page.js`,
            libraryTarget: `umd`,
            library: `lib`,
            umdNamedDefine: true,
            globalObject: `this`,
            publicPath: program.prefixPaths ? `${store.getState().config.pathPrefix}/` : `/`
          };

        case `build-javascript`:
          return {
            filename: `[name]-[contenthash].js`,
            chunkFilename: `[name]-[contenthash].js`,
            path: directoryPath(`public`),
            publicPath: program.prefixPaths ? `${store.getState().config.pathPrefix}/` : `/`
          };

        default:
          throw new Error(`The state requested ${stage} doesn't exist.`);
      }
    }

    function getEntry() {
      switch (stage) {
        case `develop`:
          return {
            commons: [require.resolve(`react-hot-loader/patch`), `${require.resolve(`webpack-hot-middleware/client`)}?path=${getHmrPath()}&noInfo=true&reload=true&quiet=true`, directoryPath(`.cache/app`)]
          };

        case `develop-html`:
          return {
            main: directoryPath(`.cache/develop-static-entry`)
          };

        case `build-html`:
          return {
            main: directoryPath(`.cache/static-entry`)
          };

        case `build-javascript`:
          return {
            app: directoryPath(`.cache/production-app`)
          };

        default:
          throw new Error(`The state requested ${stage} doesn't exist.`);
      }
    }

    function getPlugins() {
      let configPlugins = [plugins.moment(), // Add a few global variables. Set NODE_ENV to production (enables
      // optimizations for React) and what the link prefix is (__PATH_PREFIX__).
      plugins.define({
       __DEV__: true,
      __PROD__: false,
        "process.env": processEnv(stage, `development`),
        __PATH_PREFIX__: JSON.stringify(program.prefixPaths ? store.getState().config.pathPrefix : ``)
      })];
    
    
      switch (stage) {
        case `develop`:
          configPlugins = configPlugins.concat([plugins.hotModuleReplacement(), plugins.noEmitOnErrors(),new webpack.DefinePlugin({
      __DEV__: true,
      __PROD__: false,
    }), new FriendlyErrorsWebpackPlugin({
            clearConsole: false
          })]);
          break;

        case `build-javascript`:
          {
            // Minify Javascript only if needed.
            configPlugins = program.noUglify ? configPlugins : configPlugins.concat([plugins.uglify({
              uglifyOptions: {
                compress: {
                  drop_console: false
                }
              }
            })]);
            configPlugins = configPlugins.concat([plugins.extractText(),new webpack.DefinePlugin({
      __DEV__: false,
      __PROD__: true,
    }), // Write out stats object mapping named dynamic imports (aka page
            // components) to all their async chunks.
            {
              apply: function apply(compiler) {
                compiler.hooks.done.tapAsync(`gatsby-webpack-stats-extractor`, (stats, done) => {
                  let assets = {};

                  for (var _iterator = stats.compilation.chunkGroups, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                    var _ref3;

                    if (_isArray) {
                      if (_i >= _iterator.length) break;
                      _ref3 = _iterator[_i++];
                    } else {
                      _i = _iterator.next();
                      if (_i.done) break;
                      _ref3 = _i.value;
                    }

                    let chunkGroup = _ref3;

                    if (chunkGroup.name) {
                      let files = [];

                      for (var _iterator2 = chunkGroup.chunks, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                        var _ref4;

                        if (_isArray2) {
                          if (_i2 >= _iterator2.length) break;
                          _ref4 = _iterator2[_i2++];
                        } else {
                          _i2 = _iterator2.next();
                          if (_i2.done) break;
                          _ref4 = _i2.value;
                        }

                        let chunk = _ref4;
                        files.push(...chunk.files);
                      }

                      assets[chunkGroup.name] = files.filter(f => f.slice(-4) !== `.map`);
                    }
                  }

                  const webpackStats = Object.assign({}, stats.toJson({
                    all: false,
                    chunkGroups: true
                  }), {
                    assetsByChunkName: assets
                  });
                  fs.writeFile(path.join(`public`, `webpack.stats.json`), JSON.stringify(webpackStats), done);
                });
              }
            }]);
            break;
          }
      }

      return configPlugins;
    }

    function getDevtool() {
      switch (stage) {
        case `develop`:
        //  return `eval`;
          return `source-map`;
        // use a normal `source-map` for the html phases since
        // it gives better line and column numbers

        case `develop-html`:
        case `build-html`:
        case `build-javascript`:
          return `source-map`;

        default:
          return false;
      }
    }

    function getMode() {
      switch (stage) {
        case `build-javascript`:
          return `production`;

        case `develop`:
        case `develop-html`:
        case `build-html`:
          return `development`;
        // So we don't uglify the html bundle

        default:
          return `production`;
      }
    }

    function getModule(config) {
      // Common config for every env.
      // prettier-ignore
      let configRules = [rules.js(), rules.yaml(), rules.fonts(), rules.images(), rules.media(), rules.miscAssets()];

      switch (stage) {
        case `develop`:
          {
            // get schema to pass to eslint config and program for directory
            const _store$getState = store.getState(),
                  schema = _store$getState.schema,
                  program = _store$getState.program; // if no local eslint config, then add gatsby config


            if (!hasLocalEslint(program.directory)) {
              configRules = configRules.concat([rules.eslint(schema)]);
            }

            configRules = configRules.concat([{
              oneOf: [rules.cssModules(), rules.css()]
            }]);
            break;
          }

        case `build-html`:
        case `develop-html`:
          // We don't deal with CSS at all when building the HTML.
          // The 'null' loader is used to prevent 'module not found' errors.
          // On the other hand CSS modules loaders are necessary.
          // prettier-ignore
          configRules = configRules.concat([{
            oneOf: [rules.cssModules(), Object.assign({}, rules.css(), {
              use: [loaders.null()]
            })]
          }]);
          break;

        case `build-javascript`:
          // We don't deal with CSS at all when building JavaScript but we still
          // need to process the CSS so offline-plugin knows about the various
          // assets referenced in your CSS.
          //
          // It's also necessary to process CSS Modules so your JS knows the
          // classNames to use.
          configRules = configRules.concat([{
            oneOf: [rules.cssModules(), rules.css()]
          }]);
          break;
      }

      return {
        rules: configRules
      };
    }

    function getResolve() {
      const _store$getState2 = store.getState(),
            program = _store$getState2.program;

      return {
        // Use the program's extension list (generated via the
        // 'resolvableExtensions' API hook).
        extensions: 
        //["*.web.js",...program.extensions],
        [
        '.web.js',
        '.mjs',
        '.js',
        '.json',
        '.md',
        '.mdx',
        '.web.jsx',
        '.jsx',
        '.gql',
        '.graphql',
        ],
        // Default to using the site's node_modules directory to look for
        // modules. But also make it possible to install modules within the src
        // directory if you need to install a specific version of a module for a
        // part of your site.
        modules: [directoryPath(path.join(`node_modules`)), `node_modules`, // This is head scratching - without it css modules in production will fail
        // to find module with relative path
        `./`],
        alias: {
          gatsby$: directoryPath(path.join(`.cache`, `gatsby-browser-entry.js`)),
          // Using directories for module resolution is mandatory because
          // relative path imports are used sometimes
          // See https://stackoverflow.com/a/49455609/6420957 for more details
          "@babel/runtime": path.dirname(require.resolve(`@babel/runtime/package.json`)),
     //     "core-js": path.dirname(require.resolve(`core-js/package.json`)),
          "react-hot-loader": path.dirname(require.resolve(`react-hot-loader/package.json`)),
          "react-lifecycles-compat": directoryPath(`.cache/react-lifecycles-compat.js`),
          "create-react-context": directoryPath(`.cache/create-react-context.js`), 
           "lodash":"lodash-es",
        'react-native-vector-icons/FontAwesome':
          'expo-web/dist/exports/FontAwesome',
        'react-native-vector-icons/MaterialIcons':
          'expo-web/dist/exports/MaterialIcons',
        'react-native-vector-icons/Ionicons': 'expo-web/dist/exports/Ionicons',
        'react-native-vector-icons/MaterialCommunityIcons':
          'expo-web/dist/exports/MaterialCommunityIcons',
        'react-native-vector-icons/SimpleLineIcons':
          'expo-web/dist/exports/SimpleLineIcons',
        'react-native-vector-icons/Entypo': 'expo-web/dist/exports/Entypo',
        './assets/images/expo-icon.png': './assets/images/expo-icon@2x.png',
        './assets/images/slack-icon.png': './assets/images/slack-icon@2x.png',
         'react-native-picker': directoryPath(`./src/myPicker.js`),
           "react-native-linear-gradient": "react-native-web-linear-gradient",
      "react-native": directoryPath(`./src/RNW.js`)
        }
      };
    }

    function getResolveLoader() {
      const root = [path.resolve(directory, `node_modules`)];
      const userLoaderDirectoryPath = path.resolve(directory, `loaders`);

      try {
        if (fs.statSync(userLoaderDirectoryPath).isDirectory()) {
          root.push(userLoaderDirectoryPath);
        }
      } catch (err) {
        debug(`Error resolving user loaders directory`, err);
      }

      return {
        modules: [...root, path.join(__dirname, `../loaders`), `node_modules`]
      };
    }

    const config = {
      // Context is the base directory for resolving the entry option.
      context: directory,
      entry: getEntry(),
      output: getOutput(),
      module: getModule(),
      plugins: getPlugins(),
      // Certain "isomorphic" packages have different entry points for browser
      // and server (see
      // https://github.com/defunctzombie/package-browser-field-spec); setting
      // the target tells webpack which file to include, ie. browser vs main.
      target: stage === `build-html` || stage === `develop-html` ? `node` : `web`,
      profile: stage === `production`,
      devtool: getDevtool(),
      // Turn off performance hints as we (for now) don't want to show the normal
      // webpack output anywhere.
      performance: {
        hints: false
      },
      mode: getMode(),
      resolveLoader: getResolveLoader(),
      resolve: getResolve(),
      node: {
__DEV__:true,
        __filename: true
      }
    };

    if (stage === `build-javascript`) {
      config.optimization = {
        runtimeChunk: {
          name: `webpack-runtime`
        },
        splitChunks: {
          name: false
        },
        minimize: !program.noUglify
      };
    }

    if (stage === `build-html` || stage === `develop-html`) {
      const externalList = [// match `lodash` and `lodash/foo`
      // but not things like `lodash-es`
      `lodash`, /^lodash\//, `react`, /^react-dom\//, `pify`, `@reach/router`, `@reach/router/lib/history`, `common-tags`, `path`, `semver`, `react-helmet`, `minimatch`, `fs`, /^core-js\//, `es6-promise`, `crypto`, `zlib`, `http`, `https`, `debug`];
      config.externals = [function (context, request, callback) {
        if (externalList.some(item => {
          if (typeof item === `string` && item === request) {
            return true;
          } else if (item instanceof RegExp && item.test(request)) {
            return true;
          }

          return false;
        })) {
          return callback(null, `umd ${request}`);
        }

        return callback();
      }];
    }

    store.dispatch(actions.replaceWebpackConfig(config));

    const getConfig = () => store.getState().webpack;

    yield apiRunnerNode(`onCreateWebpackConfig`, {
      getConfig,
      stage,
      rules,
      loaders,
      plugins
    });
    return getConfig();
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=webpack.config.js.map