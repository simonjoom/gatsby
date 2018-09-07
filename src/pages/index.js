import React from 'react'
import { graphql,Link } from 'gatsby'
import get from 'lodash/get'

import Bio from 'components/Bio' 
import { rhythm } from '../utils/typography'
 
//const BlogIndex = ({ data,location }) => {
class BlogIndex extends React.Component {
  render() {
    const posts = get(this.props.data, 'allMdx.edges')
    //const morePosts = get(this, 'props.data.allContentfulBlogPostMdx.edges')

    //const posts = get(this, 'props.data.allMarkdownRemark.edges')
    return (
      <>
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
      </>
    )
  }
}
//}

export default BlogIndex

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
