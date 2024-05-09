import React, { useState } from 'react';
import book1 from "../../components/images/Sellerbook1.png";

const Inventory = () => {
  // State to control the visibility of the modal
  const [modalOpen, setModalOpen] = useState(false);

  // Function to toggle the modal
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="flex items-center">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="p-8 rounded-t-lg" src={book1} alt="product image" />
        </a>
        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Van Gogh: The Complete Paintings, Bibliotheca Universalis</h5>
          </a>
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">₱957</span>
            <button onClick={toggleModal} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
          </div>
        </div>
      </div>
      
      <button onClick={toggleModal} className="ml-20 bg-white border border-gray-200 rounded-lg shadow p-8">
        <svg className="w-6 h-6 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      
      <div id="crud-modal" className={`fixed inset-0 z-50 flex items-center justify-center ${modalOpen ? "" : "hidden"}`}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative p-4 w-full max-w-[600px] max-h-[900px]">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Product
              </h3>
              <button type="button" onClick={toggleModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                
                <div className="col-span-2 flex">
                  <div className="w-1/2">
                    <label htmlFor="name" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Book Name</label>
                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type book name" required="" />
                  </div>
                  <div className="w-1/2 ml-5">
                    <label htmlFor="category" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Category</label>
                    <select id="category" className="bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option selected="">Select book category</option>
                      <option value="FI">Fiction</option>
                      <option value="NFI">Non-fiction</option>
                      <option value="CB">Children's Books</option>
                      <option value="PO">Poetry</option>
                      <option value="RS">Religious and Spiritual</option>
                      <option value="MI">Miscellaneous</option>
                      <option value="RB">Reference Books</option>
                    </select>
                  </div>
                </div>
                
                <div className="col-span-2 flex">
                  <div className="w-1/4">
                    <label htmlFor="price" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Price</label>
                    <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$9.99" required="" />
                  </div>
                  <div className="w-1/4 ml-5">
                    <label htmlFor="pages" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">No. of Pages</label>
                    <input type="number" name="pages" id="pages" className="bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0" required="" />
                  </div>
                  <div className="w-1/4 ml-5">
                    <label htmlFor="quantity" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Quantity</label>
                    <input type="number" name="quantity" id="quantity" className="bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0" required="" />
                  </div>
                  <div className="w-1/4 ml-5">
                    <label htmlFor="discount" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Discount</label>
                    <input type="number" name="discount" id="discount" className="bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0" required="" />
                  </div>
                  <div className="w-1/4 ml-5">
                    <label htmlFor="genre" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Genre</label>
                    <input type="text" name="genre" id="genre" className="bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Genre" required="" />
                  </div>
                </div>
                
                <div className="col-span-2 w-3/4">
                  <label htmlFor="description" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Description</label>
                  <textarea id="description" rows="4" className="bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write the book's description here"></textarea>                    
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="paymentMethod" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Payment Method</label>
                  <div className="flex items-center">
                    <input type="radio" id="paypal" name="paymentMethod" className="h-4 w-4 text-black border-gray-300 rounded focus:ring-primary-600" />
                    <label htmlFor="paypal" className="ml-2 text-xs font-medium text-gray-900 dark:text-white">Paypal</label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input type="radio" id="cashOnDelivery" name="paymentMethod" className="h-4 w-4 text-black border-gray-300 rounded focus:ring-primary-600" />
                    <label htmlFor="cashOnDelivery" className="ml-2 text-xs font-medium text-gray-900 dark:text-white">Cash on Delivery</label>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="visibility" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Visibility</label>
                  <div className="flex items-center">
                    <input type="radio" id="visibility" name="visibility" className="h-4 w-4 text-black border-gray-300 rounded focus:ring-primary-600" />
                    <label htmlFor="visibility" className="ml-2 text-xs font-medium text-gray-900 dark:text-white">Public</label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input type="radio" id="visibility" name="visibility" className="h-4 w-4 text-black border-gray-300 rounded focus:ring-primary-600" />
                    <label htmlFor="visibility" className="ml-2 text-xs font-medium text-gray-900 dark:text-white">Private</label>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="image" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Product Image</label>
                  <div className="border border-gray-300 rounded-lg p-3 relative" style={{ height: '7rem', width: '13rem' }}>
                   
                    <input type="file" id="image" name="image" className="hidden" />
                    <label htmlFor="image" className="cursor-pointer absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-xs text-black-600 dark:text-blue-400 hover:underline" style={{ zIndex: 1 }}><i className="fas fa-upload fa-2x"></i></label>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="shippingFee" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Shipping Fee</label>
                  <input type="number" name="shippingFee" id="shippingFee" className="bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0" required="" />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="text-white bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-transform duration-200 transform hover:scale-105">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
