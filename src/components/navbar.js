import React from 'react';
import PropTypes from 'prop-types';

//import Logo from 'images/sukhothai-zeroCovid-logo.png';

const ComponentText = {
  HOME_MENU: 'สถานการณ์',
  HOSPITAL_MENU: 'โรงพยาบาล',
  DOATE_MENU: 'บริจาค',
  MARKETPLACE_MENU: 'ร้านค้า',
};

const background = '#fff8f5';

const MenuItem = ({ title, href }) => {
  return (
    <li className="flex items-center w-full lg:w-auto">
      <a
        className={
          'text-gray-800 hover:text-gray-600' +
          ' w-full px-3 py-4 lg:py-2 flex items-center text-sm lg:text-sm uppercase font-bold'
        }
        href={href}
      >
        {title}
      </a>
    </li>
  );
};

const SocialMenuItem = ({ title, iconClassName, href }) => {
  return (
    <li className="flex items-center">
      <a
        className={
          'text-gray-800 hover:text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
        }
        href={href}
      >
        <i
          className={
            'text-gray-500 fab fa-facebook text-lg leading-lg ' +
            `${iconClassName}`
          }
        />
        <span className="inline-block ml-2 lg:hidden">{title}</span>
      </a>
    </li>
  );
};

const NavBar = ({ title }) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav
        className={
          'fixed top-0 z-50 flex-wrap items-center justify-between px-2 py-3 w-full'
        }
        style={{ height: 64, background }}
      >
        <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
          <div className="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className={
                'text-gray-800 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase'
              }
              href="/"
            >
              {/* <img src={Logo} alt={title} width={100} /> */}
              <img src={''} alt={title} width={100} />
            </a>
            <button
              className={
                'block px-3 py-1 text-xl leading-none bg-transparent' +
                ' border border-transparent border-solid rounded' +
                ' outline-none cursor-pointer lg:hidden focus:outline-none'
              }
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className={'text-gray-800 fas fa-bars'}></i>
            </button>
          </div>
          {/* <div
            className={
              'lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none' +
              (navbarOpen ? ' block rounded shadow-lg' : ' hidden')
            }
          >
            <ul className="flex flex-col flex-grow mr-auto list-none lg:flex-row lg:justify-center lg:items-center">
              <MenuItem title={ComponentText.HOME_MENU} href="/" />
              <MenuItem title={ComponentText.HOSPITAL_MENU} href="/hospital" />
              <MenuItem title={ComponentText.DOATE_MENU} href="/donate" />
              <MenuItem title={ComponentText.MARKETPLACE_MENU} href="/shops" />
            </ul> 

            <ul className="flex flex-col list-none lg:justify-end lg:flex-row lg:ml-auto">
              <SocialMenuItem
                title="facebook"
                href="#"
                iconClassName="fab fa-facebook"
              />
              <SocialMenuItem
                title="twitter"
                href="#"
                iconClassName="fab fa-twitter"
              />
              <SocialMenuItem
                title="github"
                href="#"
                iconClassName="fab fa-github"
              />
            </ul>
          </div>  */}
        </div>
      </nav>
    </>
  );
};
NavBar.propTypes = {
  title: PropTypes.node,
};
NavBar.defaultProps = {
  title: 'Lanhoi Concrete',
};
export default NavBar;
