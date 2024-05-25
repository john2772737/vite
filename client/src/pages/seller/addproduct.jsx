import TableComponent from "../../components/tableComponent";
import axios from "axios";
import { useFirebase } from "../../utils/context";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { imageDb } from "../../utils/firebase";
import './/../../components/TableComponent.css'

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
function AddProduct() {
  const heading = ["Id", "Name", "Image", "Description", "Price", "Category"];
  const { currentUser } = useFirebase();
  const currentUserUid = currentUser.uid;

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createModal, setcreateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    _id: "",
    name: "",
    imageUrl: "",
    description: "",
    price: "",
    category: "",
  });

  const [createProduct, setcreateProduct] = useState({
    name: "",
    imageUrl: "",
    description: "",
    price: "",
    category: "",
    totalItem: "",
  });

  const [idp, setId] = useState("");

  const handlepic = (event) => {
    const file = event.target.files[0];

    setId(file);
  };

  console.log(createProduct.imageUrl);

  const clearCreateProductFields = () => {
    setcreateProduct({
      name: "",
      imageUrl: "",
      description: "",
      price: "",
      category: "",
      totalItem: "",
    });
  };
  const handleCancel = () => {
    clearCreateProductFields();
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/seller/${currentUserUid}/getProduct`
      );
      console.log("Response data:", response.data);
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
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
      console.log("Selected product data:", response.data);
      setSelectedProduct(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.log("Error fetching single product data:", error);
    }
  };

  const createModalclose = () => {
    setcreateModal(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  const handleCreatechanges = (e) => {
    const { name, value } = e.target;
    setcreateProduct({ ...createProduct, [name]: value });
  };

  const handleUpdate = async () => {

    try {
      const profilePictureFile = idp;

      if (profilePictureFile){
      const profilePictureRef = ref(
        imageDb,
        "profiles/" + profilePictureFile.name
      );

      await uploadBytes(profilePictureRef, profilePictureFile);
      // Retrieve the download URL of the profile picture
      const url = await getDownloadURL(profilePictureRef);
      console.log(url);


      
      const updateCreateProduct = {
        name: selectedProduct.name,
        imageUrl: url,
        description: selectedProduct.description,
        price: selectedProduct.price,
        category: selectedProduct.category,
       
      };


      await axios.put(
        `http://localhost:4000/product/updateProduct/${selectedProduct._id}`,
        updateCreateProduct
      );

      closeModal();
      fetchData();
    }  

     
    const updateCreateProduct = {
      name: selectedProduct.name,
  
      description: selectedProduct.description,
      price: selectedProduct.price,
      category: selectedProduct.category,
     
    };
    await axios.put(
      `http://localhost:4000/product/updateProduct/${selectedProduct._id}`,
      updateCreateProduct
    );
    closeModal();
      fetchData();


    } catch (error) {
      console.log("Error updating product stock:", error);
    }
  };
console.log(selectedProduct)



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
      item.description,
      item.price,
      item.category,
    ];
  });

  const categories = [
    "Fiction",
    "Non-fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Thriller",
    "Romance",
    "Biography",
    "History",
    "Self-help",
    "Poetry",
    "Comics",
    "Cookbooks",
  ];

  const openModel = () => {
    setcreateModal(true);
  };

  const handleCreate = async () => {
    try {
      const profilePictureFile = idp;
      const profilePictureRef = ref(
        imageDb,
        "profiles/" + profilePictureFile.name
      );

      await uploadBytes(profilePictureRef, profilePictureFile);
      // Retrieve the download URL of the profile picture
      const url = await getDownloadURL(profilePictureRef);
      console.log(url);

      const updateCreateProduct = {
        firebaseUid: currentUserUid,
        ...createProduct,
        imageUrl: url,
      };

      const response = await axios.post(
        `http://localhost:4000/product/createProduct`,
        updateCreateProduct
      );
      console.log("Response data:", response.data);
      setcreateModal(false);
      fetchData();
      // Clear the fields after successful creation
      handleCancel();
    } catch (error) {
      console.log("Error creating product:", error);
    }
  };

  if (data.length === 0) {
    return (
      <div>
        <h1>No Products Available</h1>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
          onClick={openModel}
        >
          Create Product
        </button>
      </div>
    );
  }

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
                  name="name"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter name"
                  value={selectedProduct.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image URL
                </label>
                <input
                  type="file"
                  id="productImage"
                  name="imageUrl"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter image URL"
                  
                  onChange={handlepic}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="productDescription"
                  name="description"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter description"
                  value={selectedProduct.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="productPrice"
                  name="price"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter price"
                  value={selectedProduct.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Item
                </label>
                <input
                  type="number"
                  id="productPrice"
                  name="total item"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter total item"
                  value={selectedProduct.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="productCategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="productCategory"
                  name="category"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={selectedProduct.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select a category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
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
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="crud-modals"
        className={`${
          createModal ? "" : "hidden"
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
                onClick={createModalclose}
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
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="name"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter name"
                  value={createProduct.name}
                  onChange={handleCreatechanges}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image URL
                </label>
                <input
                  type="file"
                  id="productImage"
                  name="imageUrl"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter image URL"
                  value={createProduct.image}
                  onChange={handlepic}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="productDescription"
                  name="description"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter description"
                  value={createProduct.description}
                  onChange={handleCreatechanges}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="productPrice"
                  name="price"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter price"
                  value={createProduct.price}
                  onChange={handleCreatechanges}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="productPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Item
                </label>
                <input
                  type="number"
                  id="productPrice"
                  name="total item"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter total item"
                  value={createProduct.totalItem}
                  onChange={handleCreatechanges}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productCategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="productCategory"
                  name="category"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={createProduct.category}
                  onChange={handleCreatechanges}
                >
                  <option value="">Select a category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end p-4 border-t dark:border-gray-600">
              <button
                type="button"
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                onClick={createModalclose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
        onClick={openModel}
      >
        create product
      </button>
      <TableComponent
        Heading={heading}
        Data={setlist}
        updateProduct={true}
        onOpensModal={updateStock}
      />
    </div>
  );
}

export default AddProduct;
