const path = require("path");
const fs = require("fs-extra");
const merge = require("lodash/merge");
const escapeStringRegexp = require("escape-string-regexp");
const defaultOptions = require("gatsby-mdx/utils/default-options");
const extractExports = require("gatsby-mdx/utils/extract-exports");
const mdx = require("gatsby-mdx/utils/mdx");

/**
 * Create Mdx nodes from MDX files.
 */
exports.onCreateNode = require("./on-create-node");

/**
 * Add additional fields to MDX nodes
 */
exports.setFieldsOnGraphQLNodeType = require("./extend-node-type");

/**
 * Add frontmatter as page context for MDX pages
 */
exports.onCreatePage = async ({ page, actions }, pluginOptions) => {
  const { createPage, deletePage } = actions;
  const { extensions, ...options } = defaultOptions(pluginOptions);
  const ext = path.extname(page.component); 
  if (extensions.includes(ext)) {
    const content = await fs.readFile(page.component, "utf8");
    const code = await mdx(content, options); 
    // grab the exported frontmatter
    const { frontmatter } = extractExports(code);

    deletePage(page);
    createPage(
      merge(
        {
          context: {
            frontmatter: {
              ...frontmatter
            }
          }
        },
        page
      )
    );
  }
};

/*
/**
 * Add the webpack config for loading MDX files
*/
exports.onCreateWebpackConfig = (
  { stage, loaders, plugins, actions, getNodes },
  pluginOptions
) => {
  const options = defaultOptions(pluginOptions);
  const testPattern = new RegExp(
    options.extensions.map(ext => `${escapeStringRegexp(ext)}$`).join("|")
  );
  const mdxTestPattern = new RegExp(
    options.extensions
      .concat(".deck-mdx")
      .map(ext => `${escapeStringRegexp(ext)}$`)
      .join("|")
  );

  const decks = options.decks.map(ext => `${escapeStringRegexp(ext)}`);

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, ".cache/gatsby-mdx"),
          use: [loaders.js()]
        },
        {
          test: testPattern,
          include: path.resolve(__dirname,  "src/pages"),
          exclude: decks,
          use: [
            loaders.js(),
            {
              loader: "gatsby-mdx/mdx-loader",
              options: {
                getNodes,
                pluginOptions: options
              }
            }
          ]
        },
        {
          test: mdxTestPattern,
          include: decks,
          use: [
            loaders.js(),
            { loader: "gatsby-mdx/mdx-deck-post-loader" },
            { loader: "mdx-deck/loader" }
          ]
        },
        {
          test: /.deck-mdx$/,
          use: [
            loaders.js(),
            { loader: "gatsby-mdx/mdx-deck-post-loader" },
            { loader: "mdx-deck/loader" }
          ]
        }
      ]
    },
    plugins: [
      plugins.define({
        __DEVELOPMENT__: stage === `develop` || stage === `develop-html`
      })
    ]
  });
};

/**
 * Add the MDX extensions as resolvable. This is how the page creator
 * determines which files in the pages/ directory get built as pages.
 */
exports.resolvableExtensions = (data, pluginOptions) =>
  defaultOptions(pluginOptions).extensions.concat(".deck-mdx");

/**
 * Convert MDX to JSX so that Gatsby can extract the GraphQL queries.
 */
exports.preprocessSource = async function preprocessSource(
  { filename, contents },
  pluginOptions
) {
  const { extensions, ...options } = defaultOptions(pluginOptions);
  const ext = path.extname(filename);

  if (extensions.includes(ext) || ext === ".deck-mdx") {
    const code = await mdx(contents, options);
    return code;
  }
  return null;
};
/*
exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: `@babel/plugin-proposal-object-rest-spread`
  });
};*/
