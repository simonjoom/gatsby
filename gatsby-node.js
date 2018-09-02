const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
 
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const { createFilePath } = require('gatsby-source-filesystem')
const paths = require('./paths')  

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

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.mjs?$/,
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
          include: paths.srcPaths
        },
        {
          test: /\.jsx?$/,
          exclude: paths.srcPathsExc,
          use: [loaders.js({cacheDirectory: false,highlightCode: true})],
        },
        {
          test: /\.(graphql|gql)$/,
          loader: 'graphql-tag/loader',
        },
      ],
    } 
  })
}
