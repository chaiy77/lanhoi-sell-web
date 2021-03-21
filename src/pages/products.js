<<<<<<< HEAD
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import { ProductGroups } from 'data/mockup-data';

const productGroups = ProductGroups;

const GroupImage = ({ title, image, path }) => {
  return (
    <div
      className={
        ' bg-red-500 mx-5 my-5 sm:w-8/12 md:w-5/12 xl:w-5/12' +
        ' flex flex-col items-center justify-center rounded-md overflow-hidden'
      }
    >
      <Link to={('/' + path.toLowerCase() + '/customerdata').replace(/ /g, '')}>
        <img
          className={'m-auto block p-1'}
          src={image}
          alt="Shop category icon"
        />
        <div className="flex justify-center ">{title}</div>
      </Link>
    </div>
  );
};

const GroupListPage = () => {
  return (
    <Layout
      renderContent={() => {
        return (
          <div className="flex flex-wrap  sm:w-full md:w-5/6 xl:w-1/2">
            {productGroups.map(group => {
              return (
                <GroupImage
                  image={group.image}
                  title={group.text}
                  path={group.path}
                />
              );
            })}
          </div>
        );
      }}
    ></Layout>
  );
};

export default GroupListPage;
=======
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import { ProductGroups } from 'data/mockup-data';

const productGroups = ProductGroups;

const GroupImage = ({ title, image, path }) => {
  return (
    <div
      className={
        ' bg-red-500 mx-5 my-5 sm:w-8/12 md:w-5/12 xl:w-5/12' +
        ' flex flex-col items-center justify-center rounded-md overflow-hidden'
      }
    >
      <Link to={('/' + path.toLowerCase() + '/customerdata').replace(/ /g, '')}>
        <img
          className={'m-auto block p-1'}
          src={image}
          alt="Shop category icon"
        />
        <div className="flex justify-center ">{title}</div>
      </Link>
    </div>
  );
};

const GroupListPage = () => {
  return (
    <Layout
      renderContent={() => {
        return (
          <div className="flex flex-wrap  sm:w-full md:w-5/6 xl:w-1/2">
            {productGroups.map(group => {
              return (
                <GroupImage
                  image={group.image}
                  title={group.text}
                  path={group.path}
                />
              );
            })}
          </div>
        );
      }}
    ></Layout>
  );
};

export default GroupListPage;
>>>>>>> b23ac42965c58d56aa202044243f3a891b98e3cd
