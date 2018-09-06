import React, { Component } from 'react'
import { View, Image } from 'react-native-web'
const ReactDOMServer = require('react-dom/server')
const visitWithParents = require(`unist-util-visit-parents`)
const path = require(`path`)
const isRelativeUrl = require(`is-relative-url`)
const _ = require(`lodash`)
const { fluid } = require(`gatsby-plugin-sharp`)
const Promise = require(`bluebird`)
const cheerio = require(`cheerio`)
const slash = require(`slash`)

// If the image is relative (not hosted elsewhere)
// 1. Find the image file
// 2. Find the image's size
// 3. Filter out any responsive image fluid sizes that are greater than the image's width
// 4. Create the responsive images.
// 5. Set the html w/ aspect ratio helper.
const MakeTag = props => {
  const {
    srcIm,
    options,
    myclass,
    presentationWidth,
    webpFluidResult,
    fluidResult,
    srcSet,
    ratio,
    style,
    other,
  } = props
  if (webpFluidResult) {
    return (
      <picture>
        <source
          srcset={webpFluidResult.srcSet}
          sizes={webpFluidResult.sizes}
          type={webpFluidResult.srcSetType}
        />
        <source
          srcset={srcSet}
          sizes={fluidResult.sizes}
          type={fluidResult.srcSetType}
        />
        <Image
          defaultSource={{ uri: fluidResult.base64 }}
          source={{ uri: srcIm }}
          style={style}
        />
      </picture>
    )
  } else {
    const style1 = {
      maxWidth: presentationWidth + 'px',
    }
    const style2 = [
      options.wrapperStyle,
      {
        bottom: 0,
        left: 0,
      },
    ]
    return (
      <View className="gatsby-resp-image-wrapper" style={style1}>
        <View className="gatsby-resp-image-background-image" style={style2}>
          <Image
            defaultSource={{ uri: fluidResult.base64 }}
            source={{ uri: srcIm }}
            style={style}
          />
        </View>
      </View>
    )
  }
}

module.exports = async (
  { files, markdownNode, markdownAST, pathPrefix, getNode, reporter },
  pluginOptions
) => {
  const defaults = {
    maxWidth: 650,
    wrapperStyle: { position: 'relative' },
    backgroundColor: `white`,
    linkImagesToOriginal: true,
    showCaptions: false,
    pathPrefix,
    withWebp: false,
  }

  const options = _.defaults(pluginOptions, defaults)

  const findParentLinks = ({ children }) =>
    children.some(
      node =>
        (node.type === `html` && !!node.value.match(/<a /)) ||
        node.type === `link`
    )

  // This will allow the use of html image tags
  // const rawHtmlNodes = select(markdownAST, `html`)
  let rawHtmlNodes = []
  visitWithParents(markdownAST, `html`, (node, ancestors) => {
    const inLink = ancestors.some(findParentLinks)

    rawHtmlNodes.push({ node, inLink })
  })

  // This will only work for markdown syntax image tags
  let markdownImageNodes = []

  visitWithParents(markdownAST, `image`, (node, ancestors) => {
    const inLink = ancestors.some(findParentLinks)

    markdownImageNodes.push({ node, inLink })
  })
  // Takes a node and generates the needed images and then returns
  // the needed HTML replacement for the image
  const generateImagesAndUpdateNode = async (node, resolve, inLink) => {
    // Check if this markdownNode has a File parent. This plugin
    // won't work if the image isn't hosted locally.

    const parentNode = getNode(markdownNode.parent)
    let imagePath
    if (parentNode && parentNode.dir) {
      imagePath = slash(path.join(parentNode.dir, node.url))
    } else {
      return null
    }
    //console.log('visitWithParents', files)
    const imageNode = _.find(files, file => {
      if (file && file.name === '.DS_Store') return null

      if (file && file.absolutePath) {
        return file.absolutePath === imagePath
      }
      return null
    })

    if (!imageNode || !imageNode.absolutePath) {
      return resolve()
    }

    let fluidResult = await fluid({
      file: imageNode,
      args: options,
      reporter,
    })
    if (!fluidResult) {
      return resolve()
    }

    // Calculate the paddingBottom %
    const ratio = `${(1 / fluidResult.aspectRatio) * 100}%`

    const originalImg = fluidResult.originalImg
    const fallbackSrc = fluidResult.src
    const srcSet = fluidResult.srcSet
    const presentationWidth = fluidResult.presentationWidth

    // Generate default alt tag
    const srcSplit = node.url.split(`/`)
    const fileName = srcSplit[srcSplit.length - 1]
    const fileNameNoExt = fileName.replace(/\.[^/.]+$/, ``)
    const defaultAlt = fileNameNoExt.replace(/[^A-Z0-9]/gi, ` `)

    // TODO
    // Fade in images on load.
    // https://www.perpetual-beta.org/weblog/silky-smooth-image-loading.html

    const imageClass = `gatsby-resp-image-image`
    const imageStyle = {
      height: '50px',
      //  verticalAlign: 'middle',
      position: 'relative',
      boxShadow: 'inset 0px 0px 0px 400px ' + options.backgroundColor,
    }
    let webpFluidResult, Wrappimagetag

    const showCaptions = options.showCaptions && node.title
    if (options.withWebp) {
      webpFluidResult = await fluid({
        file: imageNode,
        args: _.defaults(
          { toFormat: `WEBP` },
          // override options if it's an object, otherwise just pass through defaults
          options.withWebp === true ? {} : options.withWebp,
          pluginOptions,
          defaults
        ),
        reporter,
      })
    }

    // Create our base image tag
    let ImageTag = (
      <MakeTag
        options={options}
        ratio={ratio}
        webpFluidResult={webpFluidResult}
        fluidResult={fluidResult}
        myclass={imageClass}
        style={imageStyle}
        srcIm={fallbackSrc}
        srcSet={srcSet}
        alt={node.alt ? node.alt : defaultAlt}
        title={node.title ? node.title : ``}
        presentationWidth={presentationWidth}
      />
    )

    if (!inLink && options.linkImagesToOriginal) {
      Wrappimagetag = () => (
        <a
          className="gatsby-resp-image-link"
          href={originalImg}
          style={{ display: 'block' }}
          target="_blank"
          rel="noopener"
        >
          <ImageTag />
        </a>
      )
    }
    let Wrappimagetagfinal
    // Wrap in figure and use title as caption
    if (showCaptions) {
      Wrappimagetagfinal = () => (
        <figure
          className="gatsby-resp-image-figure"
          style={options.wrapperStyle}
        >
          <Wrappimagetag />
          <figcaption className="gatsby-resp-image-figcaption">
            ${node.title}
          </figcaption>
        </figure>
      )
    } else {
      Wrappimagetagfinal = () => <Wrappimagetag />
    }

    var svgDataUriPattern = /(.*)url\(&quot;data:image\/jpeg;base64,(.*)&quot;\)(">.*)/

    var Pattern = new RegExp(/&quot;/, 'g')
    // Make linking to original image optional.
    let rawHTML = await ReactDOMServer.renderToStaticMarkup(ImageTag)
    // rawHTML = rawHTML.replace(Pattern, '')

    let match = rawHTML.match(svgDataUriPattern) // inline SVG markup may contain characters (e.g., #, ") that need to be escaped

    if (match) {
      var before = match[1]
      var svg = match[2]
      var after = match[3]

      //rawHTML = before + "url('data:image/svg+xml;utf8,zefzefezfze')" + encodedS + encodedSvg + after
      rawHTML = before + 'url(data:image/jpeg;base64,' + svg + ')' + after

      rawHTML = rawHTML.replace(Pattern, '')
    }
    return rawHTML
  }

  return Promise.all(
    // Simple because there is no nesting in markdown
    markdownImageNodes.map(
      ({ node, inLink }) =>
        new Promise(async (resolve, reject) => {
          const fileType = node.url.slice(-3)

          // Ignore gifs as we can't process them,
          // svgs as they are already responsive by definition
          if (
            isRelativeUrl(node.url) &&
            fileType !== `gif` &&
            fileType !== `svg`
          ) {
            const rawHTML = await generateImagesAndUpdateNode(
              node,
              resolve,
              inLink
            )

            if (rawHTML) {
              // Replace the image node with an inline HTML node.
              node.type = `html`
              node.value = rawHTML
            }
            return resolve(node)
          } else {
            // Image isn't relative so there's nothing for us to do.
            return resolve()
          }
        })
    )
  ).then(markdownImageNodes =>
    // HTML image node stuff
    Promise.all(
      // Complex because HTML nodes can contain multiple images
      rawHtmlNodes.map(
        ({ node, inLink }) =>
          new Promise(async (resolve, reject) => {
            if (!node.value) {
              return resolve()
            }
            const $ = cheerio.load(node.value)

            if ($(`img`).length === 0) {
              // No img tags
              return resolve()
            }

            let imageRefs = []
            $(`img`).each(function() {
              imageRefs.push($(this))
            })

            for (let thisImg of imageRefs) {
              // Get the details we need.
              let formattedImgTag = {}
              formattedImgTag.url = thisImg.attr(`src`)
              formattedImgTag.title = thisImg.attr(`title`)
              formattedImgTag.alt = thisImg.attr(`alt`)

              if (!formattedImgTag.url) {
                return resolve()
              }

              const fileType = formattedImgTag.url.slice(-3)

              // Ignore gifs as we can't process them,
              // svgs as they are already responsive by definition
              if (
                isRelativeUrl(formattedImgTag.url) &&
                fileType !== `gif` &&
                fileType !== `svg`
              ) {
                const rawHTML = await generateImagesAndUpdateNode(
                  formattedImgTag,
                  resolve,
                  inLink
                )

                if (rawHTML) {
                  // Replace the image string
                  thisImg.replaceWith(rawHTML)
                } else {
                  return resolve()
                }
              }
            }

            // Replace the image node with an inline HTML node.
            node.type = `html`
            node.value = $(`body`).html() // fix for cheerio v1

            return resolve(node)
          })
      )
    ).then(htmlImageNodes => {
      return markdownImageNodes.concat(htmlImageNodes).filter(node => !!node)
    })
  )
}
