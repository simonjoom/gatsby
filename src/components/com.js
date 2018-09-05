import React from 'react'
import { Link, StaticQuery } from 'gatsby'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import Img from 'gatsby-image'

const styles = StyleSheet.create({
  box: { padding: 10, margin: 10, borderWidth: 1, borderColor: 'black' },
  text: { fontWeight: 'bold', color: 'red' },
  button: {
    marginVertical: 40,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'lightgrey',
    alignItems: 'center',
  },
  buttonText: { fontWeight: 'bold', color: 'black' },
})

export default () => (
  <StaticQuery
    query={graphql`
      query GatsbyImageSampleQuery {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                date(formatString: "DD MMMM, YYYY")
                title
                cover_image {
                  childImageSharp {
                    sizes(maxWidth: 50, maxHeight: 50) {
                      srcSet
                      src
                      sizes
                      aspectRatio
                    }
                  }
                }
                attachments {
                  publicURL
                }
              }
              tableOfContents
            }
          }
        }
      }
    `}
    render={data => {
      const el = data.allMdx.edges.find(al => {
        return al.node.fields.slug === '/test/'
      })
      console.log("cover",el.node.frontmatter.cover_image)
      const imgSizes = el.node.frontmatter.cover_image.childImageSharp.sizes
      return (
        <View style={styles.box}>
          <Text style={styles.text}>
            Hi this is React-Native-Web rendered by Gatsby
          </Text>
            <Img sizes={imgSizes} src={el.node.frontmatter.cover_image.childImageSharp.sizes.src} style={{position:"relative"}}/>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert('it works')}
          >
            <Text style={styles.buttonText}>Button</Text>
          </TouchableOpacity>
          <Link to="/page-2/">Go to page 2</Link>
        </View>
      )
    }}
  />
)

/*
    file(relativePath: { eq: "salty_egg.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        resolutions(width: 125, height: 125) {
          ...GatsbyImageSharpResolutions
        }
      }
      cover_image ..{
        
      }
    }
    
            <Img resolutions={data.file.childImageSharp.resolutions} />

      query GatsbyImageSampleQuery {
        file(relativePath: { eq: "test/profile-pic.jpg" }) {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            resolutions(width: 25, height: 25) {
              ...GatsbyImageSharpResolutions
            }
          }
        }
      }
    
    
    */