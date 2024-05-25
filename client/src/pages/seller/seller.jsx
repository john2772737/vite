import React from "react";
import { Outlet } from 'react-router-dom'; 
import SellerNavbar from "../../components/seller_navbar";
import Footer from "../../components/footer";
import SellerSidebar from "../../components/seller_sidebar";
import "./seller.css"


function User() {
  return (
    <div>
        <SellerNavbar />
        <div className="main-container">
          <SellerSidebar />
          <div className="content">
            <Outlet />
        </div>
      </div>
      <div>
          <Footer/>
        </div>
    </div>
  );
}

export default User;