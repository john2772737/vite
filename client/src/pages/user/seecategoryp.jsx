import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from './../../components/cardcomponent';
import './../../components/seecategory.css';

function Seecategoryp() {
  const location = useLocation();
  const { category } = location.state || {};
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
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="product-containerq">
      <h1 className="product-headerq">Products in {category}</h1>
      {error && <p className="errorq">{error}</p>}
      <div className="product-listq">
        {products.map((product, index) => (
          <Card key={product.id} product={product} showCartButton={true} />
        ))}
      </div>
    </div>
  );
}

export default Seecategoryp;
