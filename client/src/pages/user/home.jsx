import React from 'react'
import Banner from '../../components/Banner/banner'
import For_attraction from '../../components/for_attraction/for_attraction'
import RecommendedProduct from '../../components/recommendedProducts/recommendedProduct'

const home = () => {
  return (
    <div>
      <Banner/>
      <For_attraction />
      <RecommendedProduct/>
    </div>
  )
}

export default home
