import { Routes, Route } from "react-router-dom";
import UserLogin from "./pages/userLogin";
import Users from "./pages/user";
import Cart from "./pages/user/cart_customer";
import Profile from "./pages/user/profile";
import Editprofile from "./pages/user/editprofile";
import Purchase from "./pages/user/purchase_customer";
import Dashboard from "./pages/seller/sellerdashboard";
import Editprofile_seller from "./pages/seller/editprofile_seller";
import Order from "./pages/seller/order";
import Voucher from "./pages/seller/voucher";
import Home from "./pages/user/home";
import PageNotFound from "./pages/pagenotfound";
import NotSeller from "./pages/notSeller"
import ForgotPassword from "./pages/forgotPassword";
import SellerRegistration from "./pages/sellerRegistration";

import LiveCustomer from "./pages/user/live_customer";
import CartCustomer from "./pages/user/cart_customer";
import PurchaseCustomer from "./pages/user/purchase_customer";
import NotifCustomer from "./pages/user/notification_customer";
import LoginCustomer from "./pages/user/login_customer";

import Seller from "./pages/seller/seller";
import SellerDashboard from "./pages/seller/sellerdashboard";
import GoLive from "./pages/seller/golive";
import Inventory from "./pages/seller/inventory";
import AddProduct from "./pages/seller/addproduct";
import MyVoucher from "./pages/seller/voucher";
import NotifSeller from "./pages/seller/sellernotif";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/userLogin" element={<UserLogin />} /> {/* Corrected route path */}
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/sellerLogin" element={<NotSeller />} /> {/* Added sellerLogin route */}
      <Route path="/sellerRegistration" element={<SellerRegistration />}/>
      <Route path="*" element={<PageNotFound />} /> {/* Catch-all route for page not found */}

      <Route path="user" element={<Users />}>
        <Route index element={<Home />} />
        <Route path="/user" element={<Home />} />
        <Route path="/user/live" element={<LiveCustomer />} />
        <Route path="/user/cart" element={<CartCustomer />} />
        <Route path="/user/purchase" element={<PurchaseCustomer />} />
        <Route path="/user/notif" element={<NotifCustomer />} />
        {/* <Route path="profile" element={<Profile />}>
          <Route index element={<Editprofile />} />
          <Route path="editprofile" element={<Editprofile />} />
          <Route path="purchase" element={<Purchase />} />
        </Route> */}
        <Route path="/user/cart1" element={<CartCustomer/>}/>
        <Route path="/user/login" element={<LoginCustomer/>}/>
      </Route>

      <Route path="seller" element={<Seller />}>
        <Route index element={<Dashboard />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/golive" element={<GoLive />} />
        <Route path="/seller/inventory" element={<Inventory />} />
        <Route path="/seller/addproduct" element={<AddProduct />} />
        <Route path="/seller/voucher" element={<MyVoucher />} />
        <Route path="/seller/sellernotif" element={<NotifSeller />} />
      </Route>
    </Routes>
  );
}

export default App;
