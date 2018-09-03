import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from 'components/Bio'
import Layout from 'components/layout'
import { rhythm } from '../utils/typography'

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          excerpt
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
//const BlogIndex = ({ data,location }) => {
class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this.props.data, 'site.siteMetadata.title')
    const siteDescription = get(
      this.props.data,
      'site.siteMetadata.description'
    )

    const posts = get(this.props.data, 'allMdx.edges')
    //const morePosts = get(this, 'props.data.allContentfulBlogPostMdx.edges')

    //const posts = get(this, 'props.data.allMarkdownRemark.edges')
    console.log('posts', posts)
    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <Bio />
        <Link style={{ boxShadow: 'none' }} to="/test">
          Test
        </Link>

        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <div key={node.id}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter && node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}
//}

export default BlogIndex
