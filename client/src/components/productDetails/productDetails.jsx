import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {toast,Toaster} from 'react-hot-toast'
const ProductDetailsComponent = ({ id ,currentUser}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/product/getsingleProduct/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleQuantityChange = (action) => {
    if (action === 'increment') {
      setQuantity(quantity + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyNow = () => {
    // Implement buy now functionality here
  };

  const handleAddToCart =async() => {
    try{
      
      const updatedCart ={
        productId:id,
        quantity:quantity,
        user:currentUser

      }
      
         // Make a POST request to add the item to the cart
    const response = await axios.post('http://localhost:4000/cart/createCart', updatedCart);

    // Check if the request was successful (status code 2xx)
    if (response.status === 200 || response.status === 201) {
      // Show a success message to the user
      toast.success("Successfully added to cart");
    } else {
      // If the request was not successful, log the error
      console.error('Failed to add item to cart:', response.data);
      // Show an error message to the user
      toast.error("Failed to add item to cart. Please try again later.");
    }
  } catch (error) {
    // If an error occurs during the request, log the error
    console.error('An error occurred while adding item to cart:', error);
    // Show an error message to the user
    toast.error("An error occurred while adding item to cart. Please try again later.");
  }
};

  return (
    <div className="bg-white py-8">
      <Toaster/>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:flex-1">
            <div className="h-[460px] rounded-lg bg-gray-300 mb-4 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={product.imageUrl} // Update with actual image URL from product data
                alt={product.name} // Update with actual product name
              />
            </div>
       
          </div>

          <div className="md:flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2> {/* Update with actual product name */}
            <div className="mb-2 text-gray-600">{product.category}</div> {/* Update with actual product category */}
            <p className="text-gray-600 text-lg mb-4">{product.description}</p> {/* Update with actual product description */}
            <div className="mb-4">
              <div className="flex items-center">
                <div className="mr-6">
                  <span className="font-bold text-gray-700 text-lg">Price:</span>
                  <span className="text-gray-600 text-lg ml-2">₱{product.price}</span> {/* Update with actual product price */}
                </div>
                <div>
                  <span className="font-bold text-gray-700 text-lg">Remaining Item:</span>
                  <span className="text-gray-600 text-lg ml-2">{product.remainingItem}</span> {/* Update with actual product availability */}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="font-bold text-gray-700 text-lg">Quantity:</label>
              <div className="flex items-center mt-2">
                <button onClick={() => handleQuantityChange('decrement')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-lg hover:bg-gray-300">
                  -
                </button>
                <input id="quantity" type="number" value={quantity} readOnly className="w-16 text-center bg-gray-100 px-2 py-1" />
                <button onClick={() => handleQuantityChange('increment')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-lg hover:bg-gray-300">
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={handleAddToCart} className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-500 transition duration-200">
                Add to Cart
              </button>
              <button onClick={handleBuyNow} className="w-1/2 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-500
              transition duration-200">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Comments</h3>
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
            rows="4"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={handleCommentChange}
          ></textarea>
          <button
            type="submit"
            className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-500 transition duration-200"
          >
            Submit Comment
          </button>
        </form>
        <div>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                key={index}
                className="p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <p className="text-gray-800">{comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default ProductDetailsComponent;
