import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/b_logo.png';
import '../css/navbar.css';

const Navbar = () => {
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
                                <Link to='/user' className="text-3xl font-bold font-heading hover:text-black-500">
                                    <img src={logo} alt='Logo' className="h-11" onClick={() => { setMenu("home") }} />
                                </Link>
                            </div>
                            <div className="flex-grow flex items-center justify-center space-x-4">
                                {/* Nav Links */}
                                <ul className="hidden md:flex font-semibold font-heading space-x-6 font-bodoni-ferrara">
                                    <li className={`hover:text-red-500 ${menu === "sellerlogin" && "text-red-500"}`} onClick={() => { handleMenuClick("sellerlogin") }}>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/sellerRegistration'>SELLER CENTRE</Link>
                                        {menu === "sellerlogin" && <hr className="hr-red" />}
                                    </li>
                                    <li className={`hover:text-red-500 ${menu === "live" && "text-red-500"}`} onClick={() => { handleMenuClick("live") }}>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/product_details'>LIVE</Link>
                                        {menu === "live" && <hr className="hr-red" />}
                                    </li>
                                    <li className={`hover:text-red-500 ${menu === "cart" && "text-red-500"}`} onClick={() => { handleMenuClick("cart") }}>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/cart'>CART</Link>
                                        {menu === "cart" && <hr className="hr-red" />}
                                    </li>
                                    <li className={`hover:text-red-500 ${menu === "purchase" && "text-red-500"}`} onClick={() => { handleMenuClick("purchase") }}>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/purchase'>MY PURCHASE</Link>
                                        {menu === "purchase" && <hr className="hr-red" />}
                                    </li>
                                    <li className={`hover:text-red-500 ${menu === "notif" && "text-red-500"}`} onClick={() => { handleMenuClick("notif") }}>
                                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/notif'>NOTIFICATION</Link>
                                        {menu === "notif" && <hr className="hr-red" />}
                                    </li>
                                </ul>
                                
                            </div>
                            
                            <div className="flex items-center space-x-5">
                                {/* Cart Icon */}
                                <div onClick={() => { handleMenuClick("cart") }}>
                                    <Link to='/user/cart' className="flex items-center hover:text-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span className="flex absolute -mt-5 ml-4">
                                            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                    </Link>
                                </div>
                                {/* Profile Icon with Dropdown */}
                                <div className="relative">
                                    <Link to="/user/profile/profile_settings" className="flex items-center hover:text-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </Link>
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
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user'>HOME</Link>
                            </li>
                            <li className={`block cursor-pointer rounded-full p-2 text-center text-sm font-bold ${menu === "sellerlogin" ? 'bg-gray-900 text-gray-50' : 'hover:bg-gray-900 hover:text-gray-50'}`} onClick={() => { handleMenuClick("sellerlogin") }}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/sellerRegistration'>SELLER CENTRE</Link>
                            </li>
                            <li className={`block cursor-pointer rounded-full p-2 text-center text-sm font-bold ${menu === "live" ? 'bg-gray-900 text-gray-50' : 'hover:bg-gray-900 hover:text-gray-50'}`} onClick={() => { handleMenuClick("live") }}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/product_details'>LIVE</Link>
                            </li>
                            <li className={`block cursor-pointer rounded-full p-2 text-center text-sm font-bold ${menu === "cart" ? 'bg-gray-900 text-gray-50' : 'hover:bg-gray-900 hover:text-gray-50'}`} onClick={() => { handleMenuClick("cart") }}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/cart'>CART</Link>
                            </li>
                            <li className={`block cursor-pointer rounded-full p-2 text-center text-sm font-bold ${menu === "purchase" ? 'bg-gray-900 text-gray-50' : 'hover:bg-gray-900 hover:text-gray-50'}`} onClick={() => { handleMenuClick("purchase") }}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/purchase'>MY PURCHASE</Link>
                            </li>
                            <li className={`block cursor-pointer rounded-full p-2 text-center text-sm font-bold ${menu === "notif" ? 'bg-gray-900 text-gray-50' : 'hover:bg-gray-900 hover:text-gray-50'}`} onClick={() => { handleMenuClick("notif") }}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/notif'>NOTIFICATION</Link>
                            </li>
                            {/* Profile Icon */}
                            <li className="block cursor-pointer rounded-full p-2 text-center text-sm font-bold hover:bg-gray-900 hover:text-gray-50">
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/user/profile">PROFILE</Link>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Navbar;
