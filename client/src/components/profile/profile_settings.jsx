import React from 'react';

const Profile = () => {
    return (
        <div>
            <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]  items-center justify-center ">
                <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                    <div className="p-2 md:p-4">
                        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Profile Info.</h2>
                            <div className="grid max-w-2xl mx-auto mt-8">
                                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                    <img
                                        className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-red-300 dark:ring-red-500"
                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                                        alt="Bordered avatar"
                                    />
                                    <div className="flex flex-col space-y-5 sm:ml-8">
                                        <button
                                            type="button"
                                            className="py-3.5 px-7 text-base font-medium text-white bg-red-600 rounded-lg border border-black hover:bg-black focus:z-10 focus:ring-4 focus:ring-black-200"
                                        >
                                            Change picture
                                        </button>
                                        <button
                                            type="button"
                                            className="py-3.5 px-7 text-base font-medium text-black-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                        >
                                            Delete picture
                                        </button>
                                    </div>
                                </div>
                                <div className="items-center mt-8 sm:mt-14 text-[#000]">
                                    <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                        <div className="w-full">
                                            <label
                                                htmlFor="first_name"
                                                className="block mb-2 text-sm font-medium text-black-900 dark:text-white"
                                            >
                                                First name
                                            </label>
                                            <input
                                                type="text"
                                                id="first_name"
                                                className="bg-gray-100 border border-inrdigo-300 text-black-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                                placeholder="Enter your first name"
                                                required
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label
                                                htmlFor="last_name"
                                                className="block mb-2 text-sm font-medium text-black-900 dark:text-white"
                                            >
                                                Last name
                                            </label>
                                            <input
                                                type="text"
                                                id="last_name"
                                                className="bg-gray-100 border border-indigo-300 text-black-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                                placeholder="Enter your last name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-2 sm:mb-6">
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-black-900 dark:text-white"
                                        >
                                            Username
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="bg-gray-100 border border-indigo-300 text-black-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                            placeholder="Enter your username"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2 sm:mb-6">
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-black-900 dark:text-white"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="bg-gray-100 border border-indigo-300 text-black-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                            placeholder="Your_email@mail.com"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2 sm:mb-6">
                                        <label
                                            htmlFor="phone number"
                                            className="block mb-2 text-sm font-medium text-black-900 dark:text-white"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            id="phone number"
                                            className="bg-gray-100 border border-indigo-300 text-black-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                            placeholder="Enter your phone number"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="message"
                                            className="block mb-2 text-sm font-medium text-black-900 dark:text-white"
                                        >
                                            Bio
                                        </label>
                                        <textarea
                                            id="message"
                                            rows="4"
                                            className="block p-2.5 w-full text-sm text-black-900 bg-gray-100 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Write your bio here..."
                                        ></textarea>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="text-white bg-red-600 hover:bg-black focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Profile;
