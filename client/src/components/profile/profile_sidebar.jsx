import React from 'react';
import { NavLink } from 'react-router-dom';

const ProfileSidebar = () => {
    return (
        <aside className="hidden md:w-1/3 lg:w-1/4 md:block">
            <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-black top-12 h-full">
                <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
                <NavLink
                    to="/user/profile/profile_settings"
                    className={({ isActive }) => `flex items-center px-3 py-2.5 font-bold rounded-full ${isActive ? 'bg-red-600 text-white' : 'bg-red text-black-900 hover:bg-red-600 hover:text-white'}`}
                >
                    Profile Settings
                </NavLink>
                <NavLink
                    to="/user/profile/change_settings"
                    className={({ isActive }) => `flex items-center px-3 py-2.5 font-semibold rounded-full ${isActive ? 'bg-red-600 text-white' : 'bg-red text-black-900 hover:bg-red-600 hover:text-white'}`}
                >
                    Change Password
                </NavLink>
                <NavLink
                    to="/userLogin"
                    className={({ isActive }) => `flex items-center px-3 py-2.5 font-semibold rounded-full ${isActive ? 'bg-red-600 text-white' : 'bg-red text-black-900 hover:bg-red-600 hover:text-white'}`}
                >
                    Log Out
                </NavLink>
            </div>
        </aside>
    );
};

export default ProfileSidebar;
