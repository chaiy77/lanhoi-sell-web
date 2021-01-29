// Gatsby supports TypeScript natively!
import React from 'react';
import { navigate } from 'gatsby';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Layout from '../components/layout';

const PreData = () => {
  const { register, handleSubmit, setValue, watch, errors } = useForm({
    criteriaMode: 'all',
  });

  const submit = data => {
    console.log(data);
    if (errors);
    // navigate('products');
  };

  return (
    <Layout
      renderContent={() => {
        return (
          <div className="flex sm:w-3/4 md:w-2/3 xl:1/4  shadow-xl p-10 bg-white rounded">
            <form onSubmit={handleSubmit(submit)} className="w-full">
              <h1 className="text-4xl font-black mb-4">Customer Data</h1>
              <div className="flex flex-col pt-4">
                <label className="text-lg">ชื่อ-นามสกุล</label>
                <input
                  name="name"
                  id="name"
                  placeholder="ชื่อ-นามสกุล"
                  ref={register({
                    validate: {
                      notEmpty: value => value !== '',
                    },
                  })}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label className="text-lg">ที่อยู่</label>
                <input
                  name="address"
                  id="address"
                  ref={register}
                  placeholder="ที่อยู่"
                  className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label className="text-lg">โทรศัพท์</label>
                <input
                  name="mobile"
                  id="mobile"
                  ref={register({
                    required: true,
                    pattern: {
                      value: /^[0][1-9]{2}[-]{0,1}[0-9]{7}$/g,
                      message:
                        'phone number is invalid -> ex.088-8888888 or 088-888-8888',
                    },
                  })}
                  placeholder="0xx-xxxxxxx"
                  className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                <div className="red">
                  <ErrorMessage name="mobile" errors={errors} />
                </div>
              </div>

              <input
                type="submit"
                value="Submit"
                className="w-full bg-green-400 text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </form>
          </div>
        );
      }}
    ></Layout>
  );
};

export default PreData;
