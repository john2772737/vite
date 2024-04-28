import { Routes, Route } from "react-router-dom";
import UserLogin from "./pages/userLogin";
import Users from "./pages/user";
import Seller from "./pages/seller";
import Cart from "./pages/user/cart_customer";
import Profile from "./pages/user/profile";
import Editprofile from "./pages/user/editprofile";
import Purchase from "./pages/user/purchase_customer";
import Dashboard from "./pages/selller/dashboard";
import AddProduct from "./pages/selller/addProduct";
import Editprofile_seller from "./pages/selller/editprofile_seller";
import Inventory from "./pages/selller/Inventory";
import Live from "./pages/selller/Live";
import Order from "./pages/selller/order";
import Voucher from "./pages/selller/voucher";
import Home from "./pages/user/home";
import PageNotFound from "./pages/pagenotfound";
import NotSeller from "./pages/notSeller"

import SellerRegistration from "./pages/sellerRegistration";

import LiveCustomer from "./pages/user/live_customer";
import CartCustomer from "./pages/user/cart_customer";
import PurchaseCustomer from "./pages/user/purchase_customer";
import NotifCustomer from "./pages/user/notification_customer";
import LoginCustomer from "./pages/user/login_customer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/userLogin" element={<UserLogin />} /> {/* Corrected route path */}
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
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="editprofile" element={<Editprofile_seller />} />
        <Route path="orders" element={<Order />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="vouchers" element={<Voucher />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="live" element={<Live />} />
      </Route>
    </Routes>
  );
}

export default App;
