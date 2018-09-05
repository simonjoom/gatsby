const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const fs = require('fs-extra')
const { createFilePath } = require('gatsby-source-filesystem')
const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope')
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const paths = require('./paths')
const escapeStringRegexp = require('escape-string-regexp')
const defaultOptions = require('gatsby-mdx/utils/default-options')
const extractExports = require('gatsby-mdx/utils/extract-exports') 

/**
 * Add frontmatter as page context for MDX pages
 */

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    return graphql(
      `
        {
          allMdx(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1000
          ) {
            edges {
              node {
                id
                tableOfContents
                code {
                  scope
                }
                frontmatter {
                  title
                  cover_image {
                    childImageSharp {
                      sizes(maxWidth: 1240) {
                        srcSet
                        aspectRatio
                        src
                        sizes
                      }
                    }
                  }
                  attachments {
                    publicURL
                  }
                }
                fields {
                  slug
                }
                parent {
                  ... on File {
                    absolutePath
                    relativePath
                    name
                    dir
                  }
                }
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        console.log(result.errors) // eslint-disable-line no-console
        reject(result.errors)
      }
      const posts = result.data.allMdx.edges
console.log("pists",posts)
      _.each(posts, (post, index) => {
        const previous =
          index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node

        createPage({
          path: post.node.fields.slug,
          // component: post.node.parent.absolutePath,
          component: componentWithMDXScope(
            path.resolve('./src/templates/layout.js'),
            post.node.code.scope,
            __dirname
          ),

          context: {
            absPath: post.node.parent.absolutePath,
            previous,
            next,
            id: post.node.id,
            tableOfContents: post.node.tableOfContents,
          },
        })
      })
      resolve()
    })
  })
}

/**
 * Add frontmatter as page context for MDX pages
  allContentfulBlogPostMdx {
              edges {
                node {
                  id
                  code {
                    scope
                  }
                  meta {
                    title
                  }
                }
              }
            }
 */

/*
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
           
            allMdx(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  code {
                    scope
                  }
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors) // eslint-disable-line no-console
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMdx.edges

        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: componentWithMDXScope(
              blogPost,
              post.node.code.scope,
              __dirname
            ),
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })
        result.data.allContentfulBlogPostMdx.edges.forEach(({ node }) => {
          createPage({
            path: `/contentful/${slugify(node.meta.title, { lower: true })}`,
            component: componentWithMDXScope(
              path.resolve('./src/templates/contentful-post.js'),
              node.code.scope,
              __dirname
            ),
            context: { id: node.id },
          })
        })
      })
    )
  })
}

*/
/**
 * Add frontmatter as page context for MDX pages
  

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges

        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })
      })
    )
  })
}


*/

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = (
  { stage, rules, loaders, plugins, actions, getNodes },
  pluginOptions
) => {
  const options = defaultOptions(pluginOptions)
  const testPattern = new RegExp(
    options.extensions.map(ext => `${escapeStringRegexp(ext)}$`).join('|')
  )
  const mdxTestPattern = new RegExp(
    options.extensions
      .concat('.deck-mdx')
      .map(ext => `${escapeStringRegexp(ext)}$`)
      .join('|')
  )
  const decks = options.decks.map(ext => `${escapeStringRegexp(ext)}`)

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
          use: [loaders.js()],
        },
        {
          test: /\.(js|jsx|mjs)$/,
          exclude: /react-native-web/,
          enforce: 'pre',
          use: [
            {
              options: {
                formatter: eslintFormatter,
                eslintPath: require.resolve('eslint'),
                baseConfig: {
                  extends: [require.resolve('eslint-config-react-app')],
                },
                // @remove-on-eject-begin
                ignore: false,
                useEslintrc: true,
                // @remove-on-eject-end
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          include: path.resolve(__dirname, 'src'),
          exclude: [/[/\\\\]node_modules[/\\\\]/, /babelhelper/],
        },
        {
          test: /\.(js|jsx|mjs)$/,
          use: [loaders.jsx({})],
          exclude: /(bower_components)/,
          include: paths.srcPaths,
        },
        {
          test: /\.jsx?$/,
          exclude: paths.srcPathsExc,
          use: [loaders.js({ cacheDirectory: false, highlightCode: true })],
        },
        {
          test: /\.(graphql|gql)$/,
          loader: 'graphql-tag/loader',
        },
      ],
    },
    /* resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: { $components: path.resolve(__dirname, "src/components") },
      },*/
  })
}
