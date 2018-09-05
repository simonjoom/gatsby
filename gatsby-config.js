module.exports = {
  siteMetadata: {
    title: 'Gatsby Starter Blog',
    author: 'Kyle Mathews',
    description: 'A starter blog demonstrating what Gatsby can do.',
    siteUrl: 'https://gatsbyjs.github.io/gatsby-starter-blog/',
  },
  pathPrefix: '/gatsby-starter-blog',
  plugins: [ 
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp', 
    {
      resolve: `gatsby-mdx`,
      /*transformers: {
          mdx: ({ node, getNode }) => {
          console.log(node)
            const { title } = node
            const mdxContent = getNode(node.mdxContent___NODE)
            console.log(mdxContent,"mdxContent")
            return { meta: { title }, content: mdxContent.mdxContent }
          },
        },*/
      options: {
        root: __dirname,
        extensions: ['.mdx', '.md'],
        defaultLayouts: { posts: `${__dirname}/src/templates/layout.js` },
        mdPlugins: [
        require('remark-toc')
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images` ,
            options: {
              maxWidth: 55,
              sizeByPixelDensity: true,
            },
          },
          { resolve: 'gatsby-remark-autolink-headers' },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'posts',
      },
    },
    'gatsby-plugin-react-native-web',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/gatsby-icon.png`,
      },
    },
   // `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
}

/*
        transformers: {
          ContentfulBlogPost: ({ node, getNode }) => {
            const { title } = node
            const mdxContent = getNode(node.mdxContent___NODE)
            return { meta: { title }, content: mdxContent.mdxContent }
          },
        },
         /*{
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    }, */
//  `gatsby-transformer-sharp`,
