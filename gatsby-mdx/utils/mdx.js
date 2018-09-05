const mdx = require("@mdx-js/mdx");
const grayMatter = require("gray-matter");
const rehypeReact = require("rehype-react");
const React = require(`react`);
const View = require("react-native-web").View;
/**
 * Converts MDX to JSX, including converting classic frontmatter to an
 * exported variable.
 *
 * @param  {String} source  MDX source
 * @param  {Object} options options for mdx library
 * @return {String}         JSX source
 */
 
 const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {p: View },
}).Compiler

module.exports = async function mdxToJsx(source, options) {
  const { data, content } = grayMatter(source);

  let code = await mdx(content, options || {});
 let code2 = renderAst(code);
  return `${code2}

export const _frontmatter = ${JSON.stringify(data)};
`;
};
