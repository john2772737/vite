import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/b_logo.png';
import '../css/navbar.css';

const SellerNavbar = () => {
    const [menu, setMenu] = useState("shop");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleMenuClick = (menuItem) => {
        setMenu(menuItem);
        setIsDropdownOpen(false); // Optionally close the dropdown after a selection
    };

    return (
        <div className='navbar'>
            <div className="flex flex-wrap place-items-center w-full">
                <section className="relative w-full">
                    {/* Navbar */}
                    <nav className="flex justify-between bg-white-900 text-black w-full">
                        <div className="px-5 xl:px-12 py-3 flex items-center w-full">
                            <div className="flex-shrink-0 mr-10">
                                <Link to='/seller' className="text-3xl font-bold font-heading hover:text-black-500">
                                    <img src={logo} alt='Logo' className="h-11" onClick={() => { setMenu("dashboard") }} />
                                </Link>
                            </div>
                            <div className="flex-grow flex items-center justify-end space-x-4">
                                {/* Nav Links */}
                                <ul className="hidden md:flex font-semibold font-heading space-x-6 font-bodoni-ferrara">
                                    <li className={`hover:text-red-500 ${menu === "home" && "text-red-500"}`} onClick={() => { handleMenuClick("home") }}>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/seller'>HOME</Link>
                                        {menu === "home" && <hr className="hr-red" />}
                                    </li>
                                    <li className={`hover:text-red-500 ${menu === "sellernotif" && "text-red-500"}`} onClick={() => { handleMenuClick("sellernotif") }}>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/seller/sellernotif'>DASHBOARD</Link>
                                        {menu === "sellernotif" && <hr className="hr-red" />}
                                    </li>
                                </ul>
                                {/* Header Icons */}
                                <div className="hidden xl:flex items-center space-x-5">
                                    <a className="flex items-center hover:text-red-500" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* Responsive navbar */}
                        <button className="navbar-burger self-center mr-12 xl:hidden" onClick={toggleDropdown}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </nav>
                    {/* Dropdown */}
                    <div className={`duration-900 overflow-y-hidden transition-all md:hidden ${isDropdownOpen ? 'h-auto' : 'h-0'}`}>
                        <hr />
                        <ul className="mx-auto max-w-screen-xl px-4 py-4 font-bold font-bodoni-ferrara">
                            <li className={`block cursor-pointer rounded-full p-2 text-center text-sm font-bold ${menu === "home" ? 'bg-gray-900 text-gray-50' : 'hover:bg-gray-900 hover:text-gray-50'}`} onClick={() => { handleMenuClick("home") }}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/seller'>HOME</Link>
                            </li>
                            <li className={`block cursor-pointer rounded-full p-2 text-center text-sm font-bold ${menu === "sellernotif" ? 'bg-gray-900 text-gray-50' : 'hover:bg-gray-900 hover:text-gray-50'}`} onClick={() => { handleMenuClick("sellernotif") }}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/seller/sellernotif'>NOTIFICATION</Link>
                            </li>
                            {/* Header Icons */}
                            <li className="block cursor-pointer rounded-full p-2 text-center text-sm font-bold hover:bg-gray-900 hover:text-gray-50">
                                <a style={{ textDecoration: 'none', color: 'inherit' }} href="#">PROFILE</a>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default SellerNavbar;