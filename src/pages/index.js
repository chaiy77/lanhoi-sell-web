<<<<<<< HEAD
import React from 'react';
import { Link, navigate } from 'gatsby';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
// import 'styles/login.css';

const IndexPage = () => {
  const { register, handleSubmit, setValue, watch, errors } = useForm();

  const login = data => {
    console.log('login');
    navigate('predata');
  };

  return (
    <Layout
      renderContent={() => {
        return (
          <div className="flex sm:w-3/4 md:w-2/3 xl:1/4  shadow-xl p-10 bg-white rounded">
            <form onSubmit={handleSubmit(login)} className="w-full">
              <h1 className="text-4xl font-black mb-4">Login</h1>
              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  name="username"
                  id="username"
                  placeholder="Username"
                  ref={register}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  ref={register}
                  placeholder="Password"
                  className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <input
                type="submit"
                value="Log In"
                className="w-full bg-green-400 text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </form>
          </div>
        );
      }}
    ></Layout>
  );
};

export default IndexPage;
=======
import React from 'react';
import { Link, navigate } from 'gatsby';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
// import 'styles/login.css';

const IndexPage = () => {
  const { register, handleSubmit, setValue, watch, errors } = useForm();

  const login = data => {
    console.log('login');
    navigate('predata');
  };

  return (
    <Layout
      renderContent={() => {
        return (
          <div className="flex sm:w-3/4 md:w-2/3 xl:1/4  shadow-xl p-10 bg-white rounded">
            <form onSubmit={handleSubmit(login)} className="w-full">
              <h1 className="text-4xl font-black mb-4">Login</h1>
              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  name="username"
                  id="username"
                  placeholder="Username"
                  ref={register}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  ref={register}
                  placeholder="Password"
                  className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <input
                type="submit"
                value="Log In"
                className="w-full bg-green-400 text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </form>
          </div>
        );
      }}
    ></Layout>
  );
};

export default IndexPage;
>>>>>>> b23ac42965c58d56aa202044243f3a891b98e3cd
