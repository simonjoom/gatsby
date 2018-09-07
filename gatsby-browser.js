/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

//const preferDefault = m => (m && m.default) || m
var provider = require(`./inject-provider`) 
exports.wrapRootElement =provider.default
exports.wrapPageElement = provider.wrapPageElement