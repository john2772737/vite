import React from "react";
import { Outlet } from 'react-router-dom'; 
import ProfileSidebar from "./profile_sidebar";
import "./profile_style.css"


function profile_home() {
  return (
    <div>
        <div className="main-container">
          <ProfileSidebar />
          <div className="content">
            <Outlet />
        </div>
      </div>
    </div>
  );
}

export default profile_home;