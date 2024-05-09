import React from "react";
import { Outlet } from 'react-router-dom'; 
import SellerNavbar from "../../components/seller_navbar";
import Footer from "../../components/footer";
import "../../css/seller.css"

function Seller() {
  return (
    <div className="seller-container">
      <SellerNavbar />
      <div className="content-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Seller;
