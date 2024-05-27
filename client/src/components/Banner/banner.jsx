import React from 'react';
import banner_img from '../images/booklot_banner.png';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate= useNavigate()
  const handleClick = () => {
    navigate('/user/allproduct')
  };

  return (
    <section className="mb-0">
      <div className="bg-neutral-50 px-6 py-12 text-left light:bg-neutral-900 md:px-12 lg:text-left">
        <div className="w-full mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="mt-15 lg:mt-0 text-left lg:text-left">
              <h1 className="mt-16 mb-4 text-3xl font-bold tracking-tight md:text-4xl xl:text-5xl font-bodoni-ferrara text-black">
                From Cart to Couch, <span>Your Book Awaits!</span>
              </h1>
              <p className="mt-2 text-base font-medium text-gray-800 font-bodoni-ferrara">
                Welcome to BookLot! Discover endless stories, adventures, and treasures in our virtual bookstore. Find your next favorite read with ease and embark on a journey through the pages of imagination. Let the adventure begin!
              </p>
              <button 
                className="block mx-auto sm:inline-block bg-black px-4 sm:px-7 py-2 sm:py-3 text-white text-base font-bold font-bodoni-ferrara leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-black hover:text-white hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-black focus:text-white focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-black active:text-white active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0 sm:w-[190px] w-[140px] text-center"
                onClick={handleClick} 
                data-te-ripple-init 
                data-te-ripple-color="light" 
                role="button"
              >
                Shop Now
              </button>
            </div>
            <div className="mb-4 lg:mb-0 lg:mt-8">
              <img src={banner_img} alt="" className="h-70 lg:h-90 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
