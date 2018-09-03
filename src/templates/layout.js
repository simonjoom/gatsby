import React, { Component } from 'react'
import Helmet from 'react-helmet'
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
      fields {
        slug
      }
      excerpt
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        title
      }
      tableOfContents
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
    const post = data.mdx
    const { previous, next } = pageContext
    return (
      <Layout location={location} title={post.frontmatter.title}>
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
        <div>{children}</div>
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
//export default BlogPostTemplate
