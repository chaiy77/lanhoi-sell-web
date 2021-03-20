/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './navbar';

const Layout = ({ renderContent }) => {
  const getInnerHeight = () => {
    return typeof window !== `undefined` ? window.innerHeight : 0;
  };

  const [innerHeight, setInnerHeight] = React.useState(getInnerHeight());

  React.useEffect(() => {
    let vh = innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [innerHeight]);

  const handleResize = () => {
    setInnerHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="h-full antialiased px-2 pt-2">
      <NavBar />
      <div className="flex flex-col items-center w-full mt-16">
        <main className="flex flex-col items-center w-full">
          {renderContent({ innerHeight: innerHeight - 62 })}
        </main>
      </div>
    </div>
  );
};
Layout.propTypes = {
  renderContent: PropTypes.func,
};
Layout.defaultProps = {
  renderContent: () => <div />,
};
export default Layout;

/*

      <footer>© {new Date().getFullYear()}</footer>
*/
