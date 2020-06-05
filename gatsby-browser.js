/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import moment from 'moment';
import thLocale from 'moment/locale/th';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './src/styles/global.css';

// import LayoutContextProvider from './src/components/context/LayoutContextProvider';

// moment.updateLocale('th', thLocale);

// export const wrapRootElement = ({ element }) => {
//   return <LayoutContextProvider>{element}</LayoutContextProvider>;
// };

// https://github.com/gatsbyjs/gatsby/blob/master/examples/using-redux/gatsby-browser.js
import wrapWithProvider from './wrap-with-provider';
export const wrapRootElement = wrapWithProvider;
