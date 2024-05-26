import TableComponent from "../../components/tableComponent";
import axios from "axios";
import { useFirebase } from "../../utils/context";
import { useState, useEffect } from "react";

import {toast,Toaster} from 'react-hot-toast'

function Inventory() {
  const heading = [
    "Id",
    "Name",
    "Image",
    "Total Item",
    "Total Sold",
    "Remaining Stock",
  ];
  const { currentUser } = useFirebase();
  const currentUserUid = currentUser.uid;

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    _id: "",
    name: "",
    totalItem: 0,
  });
  const [action, setAction] = useState("add");
  const [itemCount, setItemCount] = useState("");

  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/seller/${currentUserUid}/getProduct`
      );
      console.log('Response data:', response.data);
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUserUid]);


  const updateStock = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/product/getsingleProduct/${id}`
      );
      console.log('Selected product data:', response.data);
      setSelectedProduct(response.data);

      setIsModalOpen(true);
    } catch (error) {
      console.log('Error fetching single product data:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

 
 const handleUpdate = async () => {

  if (!/^\d+$/.test(itemCount) || parseInt(itemCount) <= 0) {
    // Display toast message for invalid positive number
    toast.error("Please enter a valid positive number.");
    return
}


    try {
      let updatedTotalItem;
      if (action === "add") {
        // Logic for adding stock
        updatedTotalItem = parseInt(selectedProduct.totalItem) + parseInt(itemCount);
      } else {
        // Logic for removing stock
        updatedTotalItem = parseInt(selectedProduct.totalItem) - parseInt(itemCount);
        if (updatedTotalItem < 0) {
          alert("Cannot remove more items than are in stock.");
          return;
        }
      }

      const remaining=updatedTotalItem- selectedProduct.totalSold
      const updatedProductData = {
        totalItem: updatedTotalItem,
      
      };
   
      
      await axios.put(
        `http://localhost:4000/product/updateProduct/${selectedProduct._id}`,
        updatedProductData
      );
      
  
    
      closeModal();
      fetchData();
    } catch (error) {
      console.log('Error updating product stock:', error);
    }
  };
  

  if (data.length === 0) {
    return <h1>No Products Available</h1>;
  }

  const setlist = data.map((item) => {
    const picture = (
      <img
        src={item.imageUrl}
        alt="Description of the image"
        style={{ width: "100px", height: "100px" }}
      />
    );

    return [
      item._id,
      item.name,
      picture,
      item.totalItem,
      item.totalSold,
      item.remainingItem,
    ];
  });



const handleItemChange = (e) => {
  setItemCount(e.target.value);
};

  return (
    <div>
    <Toaster />
   <div
  id="crud-modal"
  className={`${
    isModalOpen ? "" : "hidden"
  } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
>
  <div className="relative p-4 w-full max-w-md max-h-full">
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Product Details
        </h3>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={closeModal}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      <div className="p-4 md:p-5">
        <div className="mb-4">
          <label
            htmlFor="productId"
            className="block text-sm font-medium text-gray-700"
          >
            ID
          </label>
          <input
            type="text"
            id="productId"
            name="productId"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter ID"
            value={selectedProduct._id}
            disabled
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter name"
            value={selectedProduct.name}
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Action
          </label>
          <div className="flex items-center mt-1">
            <input
              type="radio"
              id="addItem"
              name="action"
              value="add"
              checked={action === "add"}
              onChange={() => setAction("add")}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              
            />
            <label htmlFor="addItem" className="ml-2 block text-sm text-gray-700">
              Add Item
            </label>
            <input
              type="radio"
              id="removeItem"
              name="action"
              value="remove"
              checked={action === "remove"}
              onChange={() => setAction("remove")}
              className="ml-4 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label htmlFor="removeItem" className="ml-2 block text-sm text-gray-700">
              Remove Item
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="totalItem"
            className="block text-sm font-medium text-gray-700"
          >
            {action === "add" ? "Add Item" : "Remove Item"}
          </label>
          <input
            type="number"
            id="totalItem"
            name="totalItem"
            onChange={handleItemChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder={action === "add" ? "Enter items to add" : "Enter items to remove"}
            min="1"
            value={itemCount}
            
          />
        </div>
      </div>
      <div className="flex justify-end p-4 border-t dark:border-gray-600">
        <button
          type="button"
          className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          onClick={handleUpdate}
        >
          {action === "add" ? "Add" : "Remove"}
        </button>
      </div>
    </div>
  </div>
</div>

      <TableComponent
        Heading={heading}
        Data={setlist}
        Action={true}
        onOpenModal={updateStock}
        showSearch={true}
      />
    </div>
  );
}

export default Inventory;
