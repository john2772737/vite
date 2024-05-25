import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './cardcomponent'; // Assuming Card.js is in the same directory

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/product/listProductQuery', {
          params: {
            query: category,
          },
        });
        setProducts(response.data);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('Error fetching products');
        }
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <div className="product-list">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
