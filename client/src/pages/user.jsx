import React from "react";
import { Outlet } from 'react-router-dom'; 
import Footer from "../components/footer";
import Navbar from "../components/navbar";
function user() {
  return (
    <div className="user">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
    
  );
}

export default user;
