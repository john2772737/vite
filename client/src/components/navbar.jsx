import React from 'react'
import '../css/navbar.css'

import  logo from './images/b_logo.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Search from '../components/search'
const navbar = () => {

      const [menu,setMenu] = useState("shop");
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
      <div class="flex flex-wrap place-items-center w-full">
        <section class="relative w-full">  
            {/* <!-- navbar --> */}
          <nav class="flex justify-between bg-white-900 text-black w-full">
            <div class="px-5 xl:px-12 py-6 flex w-full items-center">
              <a class="text-3xl font-bold font-heading hover:text-black-500">
                <li class="h-10" onClick={() => { setMenu("home") }} style={{ listStyleType: 'none' }}>
                <Link style={{ textDecoration: 'none' }} to='/user'><img src={logo} alt='' /></Link></li>
              </a>
              {/* <!-- Nav Links --> */}
              <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 font-bodoni-ferrara">
              <li class="hover:text-red-500" onClick={() => { setMenu("live") }}>
                  <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user'>HOME</Link>
                  {menu === "live" ? <hr className="hr-red" /> : <></>}
              </li>
              <li class="hover:text-red-500" onClick={() => { setMenu("sellerlogin") }}>
                  <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/sellerRegistration'>SELLER CENTRE</Link>
                  {menu === "sellerRegister" ? <hr className="hr-red" /> : <></>}
              </li>
              <li class="hover:text-red-500" onClick={() => { setMenu("purchase") }}>
                  <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/purchase/to_pay'>MY PURCHASE</Link>
                  {menu === "purchase" ? <hr className="hr-red" /> : <></>}
              </li>

              </ul>
              {/* <!-- Header Icons --> */}
              <div class="hidden xl:flex items-center space-x-5 items-center">

                {/* SEARCH */}
                <Search/>

                {/* NOTIFICATION */}
                <Link to='/user/notif' className="relative flex items-center hover:text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a2 2 0 01-2 2 2 2 0 01-2-2m4 0H9" />
                  </svg>
                  <span className="flex absolute top-0 right-0 mt-1 -mr-1">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                </Link>

                {/* CART */}
                <div>
                    <Link to='/user/cart' class="flex items-center hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      <span class="flex absolute -mt-5 ml-4">
                        <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500">
                          </span>
                        </span>
                    </Link>
                </div >
                {/* <!-- Sign In / Register --> */}
                <div className="relative">
                <Link to="/user/profile/profile_settings" class="flex items-center hover:text-red-500" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </Link>
                </div>
              </div>
            </div>
            {/* Burger navbar */}
            <button className="navbar-burger self-center mr-12 xl:hidden" onClick={toggleDropdown}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
          </nav>
          {/* <!-- Dropdown --> */}
          <div className={`duration-900 overflow-y-hidden transition-all md:hidden ${isDropdownOpen ? 'h-auto' : 'h-0'}`}>
                        <hr />
                        <ul className="mx-auto max-w-screen-xl px-4 py-4 font-bold font-bodoni-ferrara">
                            <li className={`block cursor-pointer rounded-full p-2 text-center text-sm font-bold ${menu === "home" ? 'bg-gray-900 text-gray-50' : 'hover:bg-gray-900 hover:text-gray-50'}`} onClick={() => { handleMenuClick("home") }}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user'>HOME</Link>
                            </li>
                            <li className={`block cursor-pointer rounded-full p-2 text-center text-sm font-bold ${menu === "sellerlogin" ? 'bg-gray-900 text-gray-50' : 'hover:bg-gray-900 hover:text-gray-50'}`} onClick={() => { handleMenuClick("sellerlogin") }}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/sellerRegistration'>SELLER CENTRE</Link>
                            </li>
                            <li className={`block cursor-pointer rounded-full p-2 text-center text-sm font-bold ${menu === "purchase" ? 'bg-gray-900 text-gray-50' : 'hover:bg-gray-900 hover:text-gray-50'}`} onClick={() => { handleMenuClick("purchase") }}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/purchase'>MY PURCHASE</Link>
                            </li>
                            <li className={`block cursor-pointer rounded-full p-2 text-center text-sm font-bold ${menu === "notif" ? 'bg-gray-900 text-gray-50' : 'hover:bg-gray-900 hover:text-gray-50'}`} onClick={() => { handleMenuClick("notif") }}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/notif'>NOTIFICATION</Link>
                            </li>
                            <li className={`block cursor-pointer rounded-full p-2 text-center text-sm font-bold ${menu === "cart" ? 'bg-gray-900 text-gray-50' : 'hover:bg-gray-900 hover:text-gray-50'}`} onClick={() => { handleMenuClick("cart") }}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/user/cart'>CART</Link>
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
  )
}

export default navbar
