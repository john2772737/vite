import React, { useState } from 'react';

function Voucher() {
  const [activeTab, setActiveTab] = useState('create'); 

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="me-2">
            <a href="#" className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${activeTab === 'create' ? 'text-gray-600 border-gray-300 dark:text-gray-300' : 'hover:text-blue-600 dark:hover:text-blue-500 group'}`} onClick={() => handleTabClick('create')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 23" stroke-width="1" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg> Create Voucher
                    
            </a>
          </li>
          <li className="me-2">
            <a href="#" className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${activeTab === 'vouchers' ? 'text-gray-600 border-gray-300 dark:text-gray-300' : 'hover:text-blue-600 dark:hover:text-blue-500 group'}`} onClick={() => handleTabClick('vouchers')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 23" stroke-width="1" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                </svg> Vouchers
            </a>
          </li>
        </ul>
      </div>

      {activeTab === 'create' && (
        <div class="border-3 border-black p-9">
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a New Voucher</h2>
          <form action="#">
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Voucher Code / Name</label>
                <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type voucher code/name" required />
              </div>
              <div class="w-full">
                <label for="discount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount Amount / Percentage</label>
                <input type="number" name="discount" id="discount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="₱50 / 10%" required />
              </div>
              <div class="w-full">
                <label for="minspend" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Minimum Spend</label>
                <input type="number" name="minspend" id="minspend" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="₱150" required />
              </div>
              <div class="w-full">
                <label for="quantity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                <input type="number" name="quantity" id="quantity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="5" required />
              </div>
              <div>
                <label for="disctype" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount Settings</label>
                <select id="disctype" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  <option selected>select voucher type</option>
                  <option value="PR">Price Off</option>
                  <option value="PE">Percentage off</option>
                  <option value="FR">Free Shipping</option>
                </select>
              </div>
              <div class="w-full">
                <label for="start-time" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Start Time</label>
                <input type="datetime-local" name="start-time" id="start-time" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
              </div>
              <div class="w-full">
                <label for="end-time" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">End Time</label>
                <input type="datetime-local" name="end-time" id="end-time" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
              </div>
              <div class="flex justify-start">
                <button type="submit" class="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">Publish</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      )}

      {activeTab === 'vouchers' && (
        <div className="mt-8 px-4">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-gray-900 dark:bg-gray-900 dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Voucher Code / Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Voucher Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Discount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Claimed
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    177013
                  </th>
                  <td className="px-6 py-4">
                    Percentage Off
                  </td>
                  <td className="px-6 py-4">
                    10%
                  </td>
                  <td className="px-6 py-4">
                    9
                  </td>
                  <td className="px-6 py-4">
                    10
                  </td>
                  <td className="px-6 py-4">
                    Active
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                    <br />
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    279963
                  </th>
                  <td className="px-6 py-4">
                    Free Shipping
                  </td>
                  <td className="px-6 py-4">
                    ₱50
                  </td>
                  <td className="px-6 py-4">
                    7
                  </td>
                  <td className="px-6 py-4">
                    3
                  </td>
                  <td className="px-6 py-4">
                    Active
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                    <br />
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    355155
                  </th>
                  <td className="px-6 py-4">
                    Price Off
                  </td>
                  <td className="px-6 py-4">
                    ₱80
                  </td>
                  <td className="px-6 py-4">
                    14
                  </td>
                  <td className="px-6 py-4">
                    2
                  </td>
                  <td className="px-6 py-4">
                    Expired
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                    <br />
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   357477
                  </th>
                  <td className="px-6 py-4">
                    Percentage Off
                  </td>
                  <td className="px-6 py-4">
                    15%
                  </td>
                  <td className="px-6 py-4">
                    13
                  </td>
                  <td className="px-6 py-4">
                    5
                  </td>
                  <td className="px-6 py-4">
                    Expired
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                    <br />
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    237556
                  </th>
                  <td className="px-6 py-4">
                    Price Off
                  </td>
                  <td className="px-6 py-4">
                    ₱30
                  </td>
                  <td className="px-6 py-4">
                    11
                  </td>
                  <td className="px-6 py-4">
                    8
                  </td>
                  <td className="px-6 py-4">
                    Active
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                    <br />
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Voucher;
