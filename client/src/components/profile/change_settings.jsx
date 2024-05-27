import React from 'react'

const change_settings = () => {
  return (
    <div>
      <div>
      <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="oldpass" className="block text-sm font-medium leading-6 text-gray-900">
            Old Password
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="oldpass"
              id="oldpass"
              placeholder='Enter your old password'
              autoComplete="given-name"
              className="block w-full rounded-md border-0 p-2.5 bg-gray-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="newpass" className="block text-sm font-medium leading-6 text-gray-900">
            New Password
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="newpass"
              id="newpass"
              placeholder='Enter your new password'
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

export default change_settings
