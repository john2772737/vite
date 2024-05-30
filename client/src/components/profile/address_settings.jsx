import React from 'react'

const address_settings = () => {
  return (
    <div>
      <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">Default Address</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive the product.</p>

      <div>
        <h2 className="mt-6 font-semibold leading-10 text-gray-900">Contact</h2>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
            Full name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="full-name"
              id="full-name"
              placeholder='Enter your full name'
              autoComplete="given-name"
              className="block w-full rounded-md border-0 p-2.5 bg-gray-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
            Phone Number
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="last-name"
              id="last-name"
              placeholder='+63 000 000 0000'
              autoComplete="family-name"
              className="block w-full rounded-md border-0 p-2.5 bg-gray-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              placeholder='Example_email123@gmail.com'
              autoComplete="email"
              className="block w-full rounded-md border-0 p-2.5 bg-gray-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
            Country
          </label>
          <div className="mt-2">
            <select
              id="country"
              name="country"
              autoComplete="country-name"
              className="block w-full rounded-md border-0 py-1.5 bg-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option>Philippines</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
            Street address
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="street-address"
              id="street-address"
              placeholder='Street Name, Building, House No.'
              autoComplete="street-address"
              className="block w-full rounded-md border-0 p-2.5 bg-gray-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        
        <div className="sm:col-span-2 sm:col-start-1">
          <label htmlFor="barangay" className="block text-sm font-medium leading-6 text-gray-900">
            Barangay
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="barangay"
              id="barangay"
              placeholder='Enter your Barangay'
              autoComplete="address-level2"
              className="block w-full rounded-md border-0 p-2.5 bg-gray-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
            City
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="city"
              id="city"
              placeholder='Enter your City'
              autoComplete="address-level1"
              className="block w-full rounded-md border-0 p-2.5 bg-gray-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="province" className="block text-sm font-medium leading-6 text-gray-900">
            State / Province
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="province"
              id="province"
              placeholder='Enter your State / Province'
              autoComplete="address-level1"
              className="block w-full rounded-md border-0 p-2.5 bg-gray-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
            Region
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="region"
              id="region"
              placeholder='Enter your Region'
              autoComplete="address-level1"
              className="block w-full rounded-md border-0 p-2.5 bg-gray-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
            ZIP / Postal code
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="postal-code"
              id="postal-code"
              placeholder='Enter your ZIP / Postal code'
              autoComplete="postal-code"
              className="block w-full rounded-md border-0 p-2.5 bg-gray-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
          <button type="submit" className="text-white bg-red-600 hover:bg-black focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
            Save
          </button>
      </div>
    </div>
    </div>
  )
}

export default address_settings
