import React from "react";
import { Outlet } from 'react-router-dom'; 
import Seller_navbar from "../../components/seller_navbar";
import Footer from "../../components/footer"
function user() {
  return (
    <div className="user">
      <Seller_navbar />
      <Outlet />
      <Footer />
    </div>
    
  );
}

export default user;
