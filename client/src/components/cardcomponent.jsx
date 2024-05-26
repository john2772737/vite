import React from 'react';
import './cardcomponent.css';

const Card = ({ product, showCartButton, showTotalSold }) => {
  return (
    <div className="w-[200px] h-[300px] rounded-xl bg-white p-3 hover:shadow-xl transform hover:scale-105 transition duration-300">
      <a href="#">
        <div className="relative flex flex-col justify-between h-full">
          <div className="overflow-hidden rounded-xl">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
          </div>
          <div className="mt-1">
            <h2 className="text-slate-700">{product.name}</h2>
            <div className="flex items-center justify-between mt-3">
              <p className="text-lg font-bold text-black">₱{product.price}</p>
              {showTotalSold && (
                <p className="text-lg font-bold text-black">{product.totalSold} Sold</p>
              )}
              {showCartButton && (
                <div className="flex items-center space-x-1.5 rounded-lg bg-black px-4 py-1.5 text-white duration-100 hover:bg-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  <button className="text-sm">Add to cart</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
