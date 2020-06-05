/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
// https://github.com/gatsbyjs/gatsby/blob/master/examples/using-redux/gatsby-ssr.js
import wrapWithProvider from './wrap-with-provider';
export const wrapRootElement = wrapWithProvider;
