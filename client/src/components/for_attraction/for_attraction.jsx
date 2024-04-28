import React from 'react'
import './for_attraction.css'

import shiping_img from '../images/shipping_img.png'
import return_img from '../images/return_img.png'
import support_img from '../images/support_img.png'
import cod_img from '../images/cod_img.png'

const for_attraction = () => {
  return (
    <div>
      <div className="attraction">
        <img src={shiping_img} alt=''/>
        <p>Free Shipping</p>
        <img src={return_img} alt=''/>
        <p>3 Days Refund / Return</p>
        <img src={support_img} alt=''/>
        <p>24/7 Customer Support</p>
        <img src={cod_img} alt=''/>
        <p>Cash on Delivery</p>
      </div>
    </div>
  )
}

export default for_attraction
