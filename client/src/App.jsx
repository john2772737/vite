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
import Product_Income from "./pages/seller/product_income";
import { FirebaseProvider } from "./utils/context";
import PrivateRoute from "./utils/privateroute";
import { FirebaseProvideruser }  from "./utils/usercontext";

import PrivateRouteuser from "./utils/privateuser";
function App() {
  return (
    <Routes>
      <Route path="/" element={<FirebaseProvideruser><UserLogin /></FirebaseProvideruser>} />
      <Route path="/userLogin" element={<FirebaseProvideruser><UserLogin /></FirebaseProvideruser>} /> {/* Corrected route path */}
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      
      <Route path="/sellerRegistration" element={<FirebaseProvider><SellerRegistration /></FirebaseProvider>} />
      <Route path="*" element={<PageNotFound />} /> {/* Catch-all route for page not found */}

      <Route path="user" element={<FirebaseProvideruser><Users /></FirebaseProvideruser>}>
        
        <Route index element={<Home />} />
        <Route path="/user" element={<Home />} />
        <Route path="/user/live" element={< PrivateRouteuser element={LiveCustomer} />} />
        <Route path="/user/cart" element={< PrivateRouteuser element={CartCustomer} />} />
        <Route path="/user/purchase" element={< PrivateRouteuser element={PurchaseCustomer} />} />
        <Route path="/user/notif" element={< PrivateRouteuser element={NotifCustomer} />} />
        {/* <Route path="profile" element={< PrivateRouteuser element={}Profile />}>
          <Route index element={< PrivateRouteuser element={}Editprofile />} />
          <Route path="editprofile" element={<Editprofile />} />
          <Route path="purchase" element={< PrivateRouteuser element={}Purchase />} />
        </Route> */}
        <Route path="/user/cart1" element={< PrivateRouteuser element={CartCustomer}/>}/>
       
      </Route>


      <Route path="seller" element={
        <FirebaseProvider>
          <Seller />
        </FirebaseProvider>
      }>
       
        <Route index element={< SellerDashboard />} />
        <Route path="/seller/dashboard" element={< PrivateRoute element={SellerDashboard} />} />
        <Route path="/seller/golive" element={<PrivateRoute element={GoLive} />} /> 
        <Route path="/seller/inventory" element={<PrivateRoute element={Inventory} />} />
        <Route path="/seller/addproduct" element={<PrivateRoute element={AddProduct} />} />
        <Route path="/seller/voucher" element={<PrivateRoute element={MyVoucher} />} />
        <Route path="/seller/product_income" element={<PrivateRoute element={Product_Income} />} />
        {/* <Route path="/seller/sellernotif" element={<NotifSeller />} /> */}
      </Route>
  

    </Routes>

  );
}

export default App;
