import React from 'react'
import Banner from '../../components/Banner/banner'
import For_attraction from '../../components/for_attraction/for_attraction'
import ScrollableProductList from '..//../components/container_categories';
const home = () => {

  
  return (
    <div>
      <Banner/>
      <div className="p-6">
     
      
      <ScrollableProductList category="Fantasy" />
      <ScrollableProductList category="Horror" />
      <ScrollableProductList category="Romance" />
      <ScrollableProductList category="Comedy" />
      <ScrollableProductList category="Business" />
      <ScrollableProductList category="Children's" />
      <ScrollableProductList category="Educational" />
      
   
    </div>

    
    </div>
  )
}

export default home
