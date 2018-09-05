// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end
'use strict'

const path = require('path')
const fs = require('fs')
const url = require('url')

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
}

let checkForMonorepo = true

// @remove-on-eject-begin
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath)

// config before eject: we're in ./node_modules/react-scripts/config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  uploadsPath: resolveApp('build/static/media'),
  appBuild: resolveApp('build'),
  appBuilddev: resolveApp('buildDev'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  // These properties only exist before ejecting:
  ownPath: resolveOwn('.'),
  ownNodeModules: resolveOwn('node_modules'), // This is empty on npm 3
}

// detect if template should be used, ie. when cwd is react-scripts itself
const useTemplate = appDirectory === fs.realpathSync(path.join(__dirname, '..'))

checkForMonorepo = !useTemplate

if (useTemplate) {
  module.exports = {
    dotenv: resolveOwn('template/.env'),
    appPath: resolveApp('.'),
    appBuild: resolveOwn('../../build'),
    appPublic: resolveOwn('template/public'),
    appHtml: resolveOwn('template/public/index.html'),
    appIndexJs: resolveOwn('template/src/index.js'),
    appPackageJson: resolveOwn('package.json'),
    appSrc: resolveOwn('template/src'),
    testsSetup: resolveOwn('template/src/setupTests.js'),
    appNodeModules: resolveOwn('node_modules'),
    // These properties only exist before ejecting:
    ownPath: resolveOwn('.'),
    ownNodeModules: resolveOwn('node_modules'),
  }
}
// @remove-on-eject-end

module.exports.srcPaths = [
  module.exports.appSrc,
  resolveApp('.cache/gatsby-mdx'), 
  resolveApp('node_modules/gatsby-mdx'),
  resolveApp('node_modules/react-navigation'),
  resolveApp('node_modules/react-native-web'),
  resolveApp('node_modules/react-native-web-linear-gradient'),
  resolveApp('node_modules/react-native-tab-view'),
  //    resolveApp('node_modules/react-native-paper'),
  resolveApp('node_modules/react-navigation-drawer'),
  resolveApp('node_modules/react-navigation-deprecated-tab-navigator'),
  // resolveApp('node_modules/react-native-vector-icons'),
  resolveApp('node_modules/react-native-safe-area-view'),
  //resolveApp('node_modules/@expo/samples'),
  resolveApp('node_modules/react-native-vector-icons'),
  resolveApp('node_modules/@expo/vector-icons'),
  //    resolveApp('node_modules/react-native-platform-touchable'),
]
module.exports.srcPathsExc = [
  module.exports.appSrc, 
  resolveApp('.cache/gatsby-mdx'),
  resolveApp('./gatsby-remark-images'),
  resolveApp('node_modules/gatsby-mdx'),
  resolveApp('node_modules/react-navigation'),
  resolveApp('node_modules/react-native-web'),
  resolveApp('node_modules/react-native-tab-view'),
  resolveApp('node_modules/react-native-web-linear-gradient'),
  resolveApp('node_modules/react-navigation-drawer'),
  resolveApp('node_modules/react-native-safe-area-view'),
  resolveApp('node_modules/react-native-vector-icons'),
  resolveApp('node_modules/react-navigation-deprecated-tab-navigator'),
  resolveApp('node_modules/@expo/vector-icons'),
  resolveApp('node_modules/react-dom/'),
  resolveApp('node_modules/react/'),
  resolveApp('node_modules/core-js/'),
]

module.exports.picker = resolveApp('src/myPicker.js')
module.exports.vectoricons = resolveApp(
  'node_modules/react-native-vector-icons'
)
module.exports.useYarn = fs.existsSync(
  path.join(module.exports.appPath, 'yarn.lock')
)
