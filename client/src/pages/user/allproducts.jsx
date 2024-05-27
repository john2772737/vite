import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './../../components/cardcomponent';

function AllProducts() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/product/allproducts');
                setProducts(response.data);
            } catch (error) {
                if (error.response) {
                    setError(error.response.data.message);
                } else {
                    setError('Error fetching products');
                }
            }
        };

        fetchProducts();
    }, []); // Empty dependency array to execute the effect only once

    return (
        <div className="product-containerq">

    <h1 className="product-headerq">All Products</h1>
            {error && <p className="errorq">{error}</p>}
            <div className="product-listq">
                {products.map((product, index) => (
                    <Card key={product.id} product={product} showCartButton={true} />
                ))}
            </div>
        </div>
    );
}

export default AllProducts;
