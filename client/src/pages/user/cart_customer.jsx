import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFirebase } from "../../utils/usercontext";

const CartCustomer = () => {
  const [cart, setCart] = useState([]);
  const { currentUser } = useFirebase();
  const id = currentUser.uid;
  console.log(cart);

  const [subtotal, setSubtotal] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/cart/listCart/${id}`
      );
      const updatedCart = response.data.map((item) => ({
        ...item,
        totalPrice: item.productId.price * item.quantity,
        checked: false, // Initialize checked property
      }));
      setCart(updatedCart);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const removeItem = (itemId) => {
    ''
  };

  const toggleCheckbox = (itemId) => {
    const updatedCart = cart.map((item) =>
      item._id === itemId ? { ...item, checked: !item.checked } : item
    );
    setCart(updatedCart);
  };

  // Function to handle "Select All" checkbox
  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    const updatedCart = cart.map((item) => ({
      ...item,
      checked: newSelectAll,
    }));
    setCart(updatedCart);
    setSelectAll(newSelectAll);
  };

  useEffect(() => {
    const selectedItems = cart.filter((item) => item.checked);
    const total = selectedItems.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    setSubtotal(total);
    setSelectedCount(selectedItems.length);
  }, [cart]);

  return (
    <div className="flex flex-col w-full h-full p-8 bg-gray-100">
      {/* My Cart */}
      <div className="w-full flex flex-col gap-6 p-6 bg-white shadow-md rounded-lg">
        {/* Header Labels */}
        <div className="hidden md:flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <div className="flex gap-6 items-center w-2/5">
            <p className="font-semibold text-gray-700">Product Name</p>
          </div>
          <div className="text-center w-1/5">
            <p className="font-semibold text-gray-700">Unit Price</p>
          </div>
          <div className="text-center w-1/5">
            <p className="font-semibold text-gray-700">Quantity</p>
          </div>
          <div className="text-center w-1/5">
            <p className="font-semibold text-gray-700">Total Price</p>
          </div>
          <div className="text-center w-1/5">
            <p className="font-semibold text-gray-700">Delete Product</p>
          </div>
        </div>
        {/* Product */}
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row gap-4 justify-between p-4 bg-white shadow-md rounded-lg"
          >
            {/* Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheckbox(item._id)}
              />
            </div>
            {/* Product Information */}
            <div className="flex gap-6 items-center w-full md:w-2/5">
              <div className="w-28 h-28">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={item.productId.imageUrl}
                  alt={item.productId.name}
                />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-gray-800">
                  {item.productId.name}
                </p>
              </div>
            </div>
            {/* Unit Price */}
            <div className="flex justify-center items-center w-full md:w-1/5">
              <p className="text-lg text-gray-800">
                ${item.productId.price.toFixed(2)}
              </p>
            </div>
            {/* Product Quantity */}
            <div className="flex justify-center items-center gap-2 w-full md:w-1/5">
              <button className="w-6 h-6 flex justify-center items-center border border-gray-300 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                </svg>
              </button>
              <input
                type="text"
                readOnly
                value={item.quantity}
                className="w-8 h-8 text-center text-gray-900 border border-gray-300 rounded-sm"
              />
              <button className="w-6 h-6 flex justify-center items-center border border-gray-300 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
            {/* Total Price */}
            <div className="flex justify-center items-center w-full md:w-1/5">
              <p className="text-lg text-gray-800">
                ${item.totalPrice.toFixed(2)}
              </p>
            </div>
            {/* Remove Product Icon */}
            <div className="flex justify-center items-center w-full md:w-1/5">
              <button
                onClick={() => removeItem(item._id)}
                className="text-red-600 hover:text-red-800"
              >
                <svg
                  height="24px"
                  width="24px"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M400,113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1,64,192,77.1,192,93.3v20h-80V128h21.1l23.6,290.7
                    c0,16.2,13.1,29.3,29.3,29.3h141c16.2,0,29.3-13.1,29.3-29.3L379.6,128H400V113.3z M206.6,93.3c0-8.1,6.6-14.7,14.6-14.7h69.5
                    c8.1,0,14.6,6.6,14.6,14.7v20h-98.7V93.3z M341.6,417.9v0.4c0,8.1-6.6,14.7-14.6,14.7H186c-8.1,0-14.6-6.6-14.6-14.7v-0.4
                    L147.7,128h217.2L341.6,417.9z"
                    />
                    <g>
                      <rect height="241" width="14" x="249" y="160" />
                      <polygon points="320,160 305.4,160 294.7,401 309.3,401" />
                      <polygon points="206.5,160 192,160 202.7,401 217.3,401" />
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Subtotal */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-black border-t border-gray-200 shadow-lg mt-4 rounded-lg">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          {/* Left side: Select All Checkbox */}
          <div className="flex items-left">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
            <label className="ml-2 text-white font-semibold">Select All</label>
          </div>
          {/* Right side: Subtotal and Checkout Button */}
          <div className="flex items-center">
            <div>
              <p className="text-lg font-semibold text-white">
                Subtotal ({selectedCount} selected)
              </p>
              <p className="text-lg font-bold text-white">${subtotal.toFixed(2)}</p>
            </div>
            <button className="text-lg font-semibold text-white bg-red-600 px-4 py-2 rounded-md ml-4">
              Checkout
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CartCustomer;
