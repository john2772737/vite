import React from 'react'
import Purchase_navbar from './purchase/purchase_navbar'
import { Outlet } from 'react-router-dom'

const purchase_customer = () => {
  return (
    <div>
      <Purchase_navbar/>
      <Outlet/>
    </div>
  )
}

export default purchase_customer
