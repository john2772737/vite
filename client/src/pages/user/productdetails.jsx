import React, { useEffect } from 'react';
import ProductDetailsComponent from '../../components/productDetails/productDetails';
import { useParams } from 'react-router-dom';
import { useFirebase } from "../../utils/usercontext";
function ProductDetails() {
  let { productId } = useParams();
  const {currentUser}=useFirebase()

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, [productId]); // Scroll to top whenever productId changes
  return (
    <div>
      <ProductDetailsComponent id={productId}  currentUser={currentUser.uid}/>
    </div>
  );
}

export default ProductDetails;
