import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout
    renderContent={() => {
      return (
        <div>
          <h1> Test</h1>
        </div>
      );
    }}
  ></Layout>
);

export default IndexPage;
