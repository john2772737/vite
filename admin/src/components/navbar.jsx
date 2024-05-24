import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../client/src/components/images/b_logo.png';
import '../../../client/src/css/navbar.css';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");

    const handleMenuClick = (menuItem) => {
        setMenu(menuItem);
        setIsDropdownOpen(false); // Optionally close the dropdown after a selection
    };

    return (
        <div className='navbar navbar-shadow'>
            <div className="flex flex-wrap place-items-center w-full">
                <section className="relative w-full">
                    {/* Navbar */}
                    <nav className="flex justify-between bg-white-900 text-black w-full">
                        <div className="px-5 xl:px-12 py-3 flex items-center w-full">
                            <div className="flex-shrink-0 mr-10">
                                <Link to='' className="text-3xl font-bold font-heading hover:text-black-500">
                                    <img src={logo} alt='Logo' className="h-11" onClick={() => { setMenu("dashboard") }} />
                                </Link>
                            </div>
                            <div className="flex-grow flex items-center justify-end space-x-4">
                                {/* Nav Links and Icons */}
                                <ul className="flex items-center font-semibold font-heading space-x-4 font-bodoni-ferrara">
                                  <li>
                                      <a className="flex items-center">
                                          <span className="inline-flex justify-center items-center">
                                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                              </svg>
                                          </span>
                                          <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
                                      </a>
                                  </li>
                              </ul>
                            </div>
                        </div>
                    </nav>
                </section>
            </div>
        </div>
    );
}

export default Navbar;
