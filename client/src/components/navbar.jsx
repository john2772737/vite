import React from 'react'
import '../css/navbar.css'

import  logo from './images/b_logo.png'
import cart_icon from './images/cart.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const navbar = () => {

      const [menu,setMenu] = useState("shop");

  return (
    <div className='navbar'>
      <div className='nav-logo'>
      <li onClick={() => { setMenu("home") }} style={{ listStyleType: 'none' }}>
    <Link style={{ textDecoration: 'none' }} to='/user'><img src={logo} alt='' /></Link></li>
      </div>
      <ul className="nav-menu">
        <li>SELLER CENTRE</li>
        <li onClick={()=>{setMenu("live")}}><Link style={{ textDecoration:'none', color: 'inherit'}}  to='/user/live'>LIVE</Link>{menu==="live"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("cart")}}><Link style={{ textDecoration:'none', color: 'inherit'}}  to='/user/cart'>CART</Link>{menu==="cart"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("purchase")}}><Link style={{ textDecoration:'none', color: 'inherit'}}  to='/user/purchase'>MY PURCHASE</Link>{menu==="purchase"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("notif")}}><Link style={{ textDecoration:'none', color: 'inherit'}}  to='/user/notif'>NOTIFICATION</Link>{menu==="notif"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        <Link to='/userLogin'><button>Login</button></Link>
        <Link to='/user/cart1'><img src={cart_icon} alt='' /></Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  )
}

export default navbar
