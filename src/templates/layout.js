import React, { Component } from 'react'
import { Text } from 'react-native'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { Link, graphql } from 'gatsby' 

import Bio from '../components/Bio'
//import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'


export default class MDXRuntimeTest extends Component {
  render() {
    const {
      children,
      data,
      location,
      tableOfContents,
      pageContext,
    } = this.props
    console.log(data.allImageSharp)
    console.log(data.mdx)
    const post = data.mdx;
    if(!post)
    return null;
    const { previous, next } = pageContext
    return (
      <>
        <h1>{post.frontmatter.title}</h1>
        <Text
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </Text>
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
      </>
    )
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allImageSharp(
      filter: { fields: { slug: { regex: "/images/" } } }
    ) {
      edges {
        node {
          ... on ImageSharp {
            fields {
              slug
            }
            fluid(maxWidth: 2048) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
    mdx(id: { eq: $id }) {
      id
      tableOfContents
      code {
        scope
        body
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
      }
      fields {
        slug
      }
    }
  }
`
/*
            <MDXRenderer tableOfContents={tableOfContents}>
              {data.mdx.code.body}
            </MDXRenderer>
            
            */
//export default BlogPostTemplate
