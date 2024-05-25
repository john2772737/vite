import React from 'react'
import Banner from '../../components/Banner/banner'
import For_attraction from '../../components/for_attraction/for_attraction'
import ScrollableProductList from '..//../components/container_categories';
const home = () => {

  
  return (
    <div>
      <Banner/>
      <div className="p-6">
      <ScrollableProductList category="Horror" />
      <ScrollableProductList category="Comedy" />
   
    </div>

      
      <For_attraction />
    </div>
  )
}

export default home
