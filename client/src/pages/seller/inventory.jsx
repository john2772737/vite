import TableComponent from "../../components/tableComponent";
import axios from "axios";
import { useFirebase } from "../../utils/context";
import { useState, useEffect } from "react";

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
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedProduct, setSelectedProduct] = useState({
    _id: "",
    name: "",
    totalItem: "",
  }); // State to track the selected product ID
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/seller/${currentUserUid}/getProduct`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, [currentUserUid]); // Add currentUserUid to dependency array

  const updateStock = async (id) => {
    console.log(id);

    try {
      const response = await axios.get(
        `http://localhost:4000/product/getsingleProduct/${id}`
      );
      console.log(response.data);

      setSelectedProduct(response.data);
    } catch (error) {
      console.log(error);
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };
  
  const [addItem, setaddItem] = useState('');

  const handleaddItemChange = (e) => {
    let newValue = e.target.value;
    if (newValue < 1) {
      newValue = 1;
    }
    setaddItem(newValue);
  };

  const handleKeyPress = (e) => {
    // Get the value of the input field
    let newValue = e.target.value;
    
    // Get the keyCode of the pressed key
    const keyCode = e.keyCode || e.which;

    // Check if the pressed key is a number key and newValue is not negative
    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
      newValue = parseInt(newValue + e.key); // Concatenate the pressed key to the current value
      if (newValue < 1) {
        e.preventDefault(); // Prevent default action (typing the key)
      }
    } else {
      e.preventDefault(); // Prevent default action for non-numeric keys
    }
  };

  return (
    <div>
      {/* Main modal */}
      <div
        id="crud-modal"
        className={`${
          isModalOpen ? "" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
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
            {/* Modal body */}
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
                <label
                  htmlFor="totalItem"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add Item
                </label>
                <input
                  type="number"
                  id="totalItem"
                  name="totalItem"
                  onChange={handleaddItemChange}
                  onKeyPress={handleKeyPress}
                  
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter total item"
                  min="1" // Limit to be greater than or equal to 1
                />
              </div>
            </div>

            {/* Modal footer */}
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
                onClick={""}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render the TableComponent and pass the onOpenModal function */}
      <TableComponent
        Heading={heading}
        Data={setlist}
        Action={true}
        onOpenModal={updateStock}
      />
    </div>
  );
}

export default Inventory;
