import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Card from './cardcomponent'; // Assuming Card.js is in the same directory
import './container.css';

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const productListRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/product/listProductQuery', {
          params: {
            query: category,
          },
        });
        setProducts(response.data);
        console.log(response.data);
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

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  useEffect(() => {
    if (productListRef.current) {
      const containerWidth = productListRef.current.offsetWidth;
      const newPosition = currentIndex * containerWidth;
      productListRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  }, [currentIndex]);

  return (
    <div className="product-list-container" style={{marginBottom: '20px' }}>
      <h3>{category}</h3>
      {error && <p className="error">{error}</p>}
      <div className="product-list"  ref={productListRef} >
        {products.map((product, index) => (
          <div key={product.id} className="card-container">
            <Card product={product} showTotalSold={true} />
          </div>
        ))}
      </div>
      <button onClick={handlePrev} className="arrow-button left-arrow">&#10094;</button>
      <button onClick={handleNext} className="arrow-button right-arrow">&#10095;</button>
    </div>
  );
};

export default ProductList;
