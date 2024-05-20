import React from "react";
import { Outlet } from 'react-router-dom'; 
import SellerNavbar from "../../components/seller_navbar";
import Footer from "../../components/footer";
import SellerSidebar from "../../components/seller_sidebar";

function User() {
  return (
    <div className="flex">
      <div className="w-full">
        <SellerNavbar />
        <div className="flex">
          <SellerSidebar />
          <div className="w-full">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default User;
