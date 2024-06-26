import TableComponent from "../../components/tableComponent";
import axios from "axios";
import { useFirebase } from "../../utils/context";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { imageDb } from "../../utils/firebase";
import ".//../../components/TableComponent.css";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
function Voucher() {
  const heading = [
    "Id",
    "Code",
    "Value",
    "Expiration Date",
    "Description",
    "Active",
  ];
  const { currentUser } = useFirebase();
  const currentUserUid = currentUser.uid;

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createModal, setcreateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    _id: "",
    code: "",
    value: "",
    expirationDate: "",
    description: "",
    active: false,
  });

  const [createProduct, setcreateProduct] = useState({
    code: "",
    value: "",
    expirationDate: "",
    description: "",
    active: false,
  });

  const clearCreateProductFields = () => {
    setcreateProduct({
      code: "",
      value: "",
      expirationDate: "",
      description: "",
      active: false,
    });
  };
  const handleCancel = () => {
    clearCreateProductFields();
  };
  const fetchData = async () => {
    try {
      console.log("Fetching data...");
      const response = await axios.get(
        `http://localhost:4000/voucher/listVoucher/${currentUserUid}`
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
        `http://localhost:4000/voucher/getsingleVoucher/${id}`
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

  const setlist = data.map((item) => {

    let active
    if (item.active === true) {
      active = "Active";
    } else {
      active = "Inactive";
    }
    return [
      item._id,
      item.code,
      item.value,
      item.expirationDate,
      item.description,
      active
    ];
  });

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:4000/voucher/deleteVoucher/${id}`
      );
      fetchData();
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };
  const openModel = () => {
    setcreateModal(true);
  };

  const handleCreate = async () => {
    try {
      const updateCreateProduct = {
        firebaseUid: currentUserUid,
        ...createProduct,
      };
      const response = await axios.post(
        `http://localhost:4000/voucher/createVoucher`,
        updateCreateProduct
      );
      fetchData();
      setcreateModal(false);
    

      handleCancel();
    } catch (error) {
      console.log("Error creating product:", error);
    }
  };

  if (data.length === 0) {
    return (
      <div>
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
                    htmlFor="productCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Code
                  </label>
                  <input
                    type="text"
                    id="productCode"
                    name="code"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter code"
                    value={createProduct.code}
                    onChange={handleCreatechanges}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="productValue"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Value
                  </label>
                  <input
                    type="number"
                    id="productValue"
                    name="value"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter value"
                    value={createProduct.value}
                    onChange={handleCreatechanges}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="productExpirationDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    id="productExpirationDate"
                    name="expirationDate"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Select expiration date"
                    value={createProduct.expirationDate}
                    onChange={handleCreatechanges}
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
                    htmlFor="productActive"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Active
                  </label>
                  <select
                    id="productActive"
                    name="active"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={createProduct.active}
                    onChange={handleCreatechanges}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
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

        <h1>No Voucher Available</h1>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
          onClick={openModel}
        >
          Create Voucher
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
                  htmlFor="productCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Code
                </label>
                <input
                  type="text"
                  id="productCode"
                  name="code"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter code"
                  value={selectedProduct.code}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productValue"
                  className="block text-sm font-medium text-gray-700"
                >
                  Value
                </label>
                <input
                  type="number"
                  id="productValue"
                  name="value"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter value"
                  value={selectedProduct.value}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productExpirationDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiration Date
                </label>
                <input
                  type="date"
                  id="productExpirationDate"
                  name="expirationDate"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter expiration date"
                  value={selectedProduct.expirationDate}
                  onChange={handleInputChange}
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
                  htmlFor="productActive"
                  className="block text-sm font-medium text-gray-700"
                >
                  Active
                </label>
                <select
                  id="productActive"
                  name="active"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={selectedProduct.active}
                  onChange={handleInputChange}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
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
                    htmlFor="productCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Code
                  </label>
                  <input
                    type="text"
                    id="productCode"
                    name="code"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter code"
                    value={createProduct.code}
                    onChange={handleCreatechanges}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="productValue"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Value
                  </label>
                  <input
                    type="number"
                    id="productValue"
                    name="value"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter value"
                    value={createProduct.value}
                    onChange={handleCreatechanges}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="productExpirationDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    id="productExpirationDate"
                    name="expirationDate"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Select expiration date"
                    value={createProduct.expirationDate}
                    onChange={handleCreatechanges}
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
                    htmlFor="productActive"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Active
                  </label>
                  <select
                    id="productActive"
                    name="active"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={createProduct.active}
                    onChange={handleCreatechanges}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
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
        updateVoucher={true}
        onOpensModal={updateStock}
        deleteP={handleDelete}

      />
    </div>
  );
}

export default Voucher;
