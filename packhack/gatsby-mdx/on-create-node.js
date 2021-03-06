const { isFunction } = require("lodash");
const debug = require("debug")("gatsby-mdx:on-create-node");

const { createFilePath } = require('gatsby-source-filesystem')
const defaultOptions = require("gatsby-mdx/utils/default-options");
const createMDXNode = require("gatsby-mdx/utils/create-mdx-node");

module.exports = async (
  { node, getNode, loadNodeContent, actions, createNodeId },
  pluginOptions
) => {
  const options = defaultOptions(pluginOptions);
 /* const { createNodeField } = actions
  console.log(node.internal)
  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }*/
  /**
   * transformerOptions can be a function or a {transformer, filter} object
   */
  if (Object.keys(options.transformers).includes(node.internal.type)) {
    const transformerOptions = options.transformers[node.internal.type];
    const transformerFn = isFunction(transformerOptions)
      ? transformerOptions
      : transformerOptions.transformer;
    const filterFn = transformerOptions ? transformerOptions.filter : undefined;
    debug(
      `${node.internal.type} has transformerFn ${isFunction(transformerFn)}`
    );
    debug(`${node.internal.type} has filterFn ${isFunction(filterFn)}`);
    if (transformerFn) {
      if ((isFunction(filterFn) && filterFn({ node })) || !filterFn) {
        debug(`processing node ${node.id}`);
        await createMDXNode(
          {
            createNodeId,
            getNode,
            loadNodeContent,
            node,
            transform: transformerFn
          },
          actions,
          { __internalMdxTypeName: "Mdx", ...pluginOptions }
        );
      }
    }
  }
}
