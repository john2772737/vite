import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { regions, provinces, municipalities, baranggays } from 'ph-geo-admin-divisions';

function Checkout() {
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || [];

  console.log(selectedItems)

  const [address, setAddress] = useState({
    region: '',
    province: '',
    municipality: '',
    barangay: '',
    additionalDetail: '' // New state for additional address detail
  });

  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [filteredMunicipalities, setFilteredMunicipalities] = useState([]);
  const [filteredBarangays, setFilteredBarangays] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  useEffect(() => {
    // Filter provinces based on the selected region
    if (address.region) {
      const filtered = provinces.filter(province => province.regionId === address.region);
      setFilteredProvinces(filtered);
    } else {
      setFilteredProvinces([]);
    }
  }, [address.region]);

  useEffect(() => {
    // Filter municipalities based on the selected province
    if (address.province) {
      const filtered = municipalities.filter(municipality => municipality.provinceId === address.province);
      setFilteredMunicipalities(filtered);
    } else {
      setFilteredMunicipalities([]);
    }
  }, [address.province]);

  useEffect(() => {
    // Filter barangays based on the selected municipality and province
    if (address.municipality && address.province) {
      const filtered = baranggays.filter(barangay => barangay.municipalityId === address.municipality && barangay.provinceId === address.province);
      setFilteredBarangays(filtered);
    } else {
      setFilteredBarangays([]);
    }
  }, [address.municipality, address.province]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const calculateTotalAmount = () => {
    return selectedItems.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2);
  };

  return (
    <div>
      <div className="font-sans bg-gray-100">
        <div className="flex max-sm:flex-col gap-4 h-full">
          <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[350px] sm:min-w-[300px]">
            <div className="relative h-full">
              <div className="p-4 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                <div className="space-y-4">
                  {selectedItems.map((item) => (
                    <div key={item.productId._id} className="flex items-start gap-4">
                      <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-2 shrink-0 bg-gray-300 rounded-md">
                        <img src={item.productId.imageUrl} alt={item.productId.name} className="w-full object-contain" />
                      </div>
                      <div className="w-full">
                        <h3 className="text-base text-white">{item.productId.name}</h3>
                        <ul className="text-xs text-gray-300 space-y-1 mt-2">
                          <li className="flex flex-wrap gap-4">Size <span className="ml-auto">{item.size}</span></li>
                          <li className="flex flex-wrap gap-4">Quantity <span className="ml-auto">{item.quantity}</span></li>
                          <li className="flex flex-wrap gap-4">Total Price <span className="ml-auto">₱{item.totalPrice.toFixed(2)}</span></li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:absolute md:left-0 md:bottom-0 bg-gray-800 w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-base text-white">Total <span className="ml-auto">₱{calculateTotalAmount()}</span></h4>
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto w-full h-max rounded-md p-4 sticky top-0">
            <h2 className="text-xl font-bold text-gray-800">Shipping Address</h2>
            <form className="mt-8">
              <div className="mt-4">
                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                  Region
                </label>
                <select
                  id="region"
                  name="region"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                  value={address.region}
                  onChange={handleChange}
                >
                  <option value="">Select a region</option>
                  {regions.map(region => (
                    <option key={region.psgcId} value={region.regionId}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                  Province
                </label>
                <select
                  id="province"
                  name="province"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                  value={address.province}
                  onChange={handleChange}
                >
                  <option value="">Select a province</option>
                  {filteredProvinces.map(province => (
                    <option key={province.psgcId} value={province.provinceId}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label htmlFor="municipality" className="block text-sm font-medium text-gray-700">
                  Municipality
                </label>
                <select
                  id="municipality"
                  name="municipality"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                  value={address.municipality}
                  onChange={handleChange}
                >
                  <option value="">Select a municipality</option>
                  {filteredMunicipalities.map(municipality => (
                    <option key={municipality.psgcId} value={municipality.municipalityId}>
                      {municipality.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label htmlFor="barangay" className="block text-sm font-medium text-gray-700">
                  Barangay
                </label>
                <select
                  id="barangay"
                  name="barangay"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                  value={address.barangay}
                  onChange={handleChange}
                >
                  <option value="">Select a barangay</option>
                  {filteredBarangays.map(barangay => (
                    <option key={barangay.psgcId} value={barangay.baranggayId}>
                      {barangay.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Additional Address Detail */}
              <div className="mt-4">
                <label htmlFor="additionalDetail" className="block text-sm font-medium text-gray-700">
                  Additional Detail
                </label>
                <input
                  type="text"
                  id="additionalDetail"
                  name="additionalDetail"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                  value={address.additionalDetail}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="cod">Cash on Delivery (COD)</option>
                {/* Add other payment methods if needed */}
              </select>
            </div>
              <div className="mt-4">
              <button
                type="button"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                onClick={'handleConfirmOrder'}
              >
                Confirm Order
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

