import React, { Component } from 'react' 
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      tableOfContents
      code {
        scope
      }
      excerpt
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
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
`

export default class MDXRuntimeTest extends Component {
  render() {
    const {
      children,
      data,
      location,
      tableOfContents,
      pageContext,
    } = this.props
    console.log(data.mdx.frontmatter)
    const post = data.mdx
    const { previous, next } = pageContext
    return (
      <Layout
        location={location}
        title={post.frontmatter && post.frontmatter.title}
      >
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <MDXRenderer tableOfContents={tableOfContents}>
          {post.code.body}
        </MDXRenderer>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      </Layout>
    )
  }
}

/*
            <MDXRenderer tableOfContents={tableOfContents}>
              {data.mdx.code.body}
            </MDXRenderer>
            
            */
//export default BlogPostTemplate
