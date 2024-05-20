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
      <div class="flex flex-wrap place-items-center ">
        <section class="relative mx-auto">  
            {/* <!-- navbar --> */}
          <nav class="flex justify-between bg-white-900 text-black w-screen">
            <div class="px-5 xl:px-12 py-3 flex w-full items-center">
              <a class="text-3xl font-bold font-heading hover:text-black-500">
                <li class="h-11" onClick={() => { setMenu("dashboard") }} style={{ listStyleType: 'none' }}>
                <Link style={{ textDecoration: 'none' }} to='/seller'><img src={logo} alt='' /></Link></li>
              </a>
              {/* <!-- Nav Links --> */}
              <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 font-bodoni-ferrara">
              <li class="hover:text-red-500" onClick={() => { setMenu("golive") }}>
                  <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/seller/golive'>GO LIVE</Link>
                  {menu === "golive" ? <hr className="hr-red" /> : <></>}
              </li>
              <li class="hover:text-red-500" onClick={() => { setMenu("inventory") }}>
                  <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/seller/inventory'>INVENTORY</Link>
                  {menu === "inventory" ? <hr className="hr-red" /> : <></>}
              </li>
              <li class="hover:text-red-500" onClick={() => { setMenu("addproduct") }}>
                  <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/seller/addproduct'>ADD PRODUCT</Link>
                  {menu === "addproduct" ? <hr className="hr-red" /> : <></>}
              </li>
              <li class="hover:text-red-500" onClick={() => { setMenu("voucher") }}>
                  <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/seller/voucher'>MY VOUCHERS</Link>
                  {menu === "voucher" ? <hr className="hr-red" /> : <></>}
              </li>
              <li class="hover:text-red-500" onClick={() => { setMenu("sellernotif") }}>
                  <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/seller/sellernotif'>NOTIFICATION</Link>
                  {menu === "sellernotif" ? <hr className="hr-red" /> : <></>}
              </li>
              </ul> 
              <form class="mt-0 mx-auto max-w-[250px] max-h-[40px] py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
                <input type="text" placeholder="Search for Books" class="font-bodoni-ferrara bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0" name="topic"></input>
                    <button class="mt-0 font-bodoni-ferrara flex flex-row items-center justify-center min-w-[70px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1 h-[27px] -mr-5" >
                        Search
                    </button>
                </form>
              {/* <!-- Header Icons --> */}
              <div class="hidden xl:flex items-center space-x-5 items-center">
                <a class="hover:text-red-500" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </a>
                <a class="flex items-center hover:text-red-500" link="#">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  <span class="flex absolute -mt-5 ml-4">
                    <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500">
                      </span>
                    </span>
                </a>
                {/* <!-- Sign In / Register      --> */}
                <a class="flex items-center hover:text-red-500" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </a>
                
              </div>
            </div>
            {/* <!-- Responsive navbar --> */}
            <a class="xl:hidden flex mr-6 items-center" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="flex absolute -mt-5 ml-4">
                <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500">
                </span>
              </span>
            </a>
            <a class="navbar-burger self-center mr-12 xl:hidden" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </a>
          </nav>
        </section>
      </div>
    </div>
  )
}

export default SellerNavbar;
