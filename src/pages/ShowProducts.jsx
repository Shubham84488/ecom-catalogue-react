import React from 'react'
import ProductList from '../components/ProductList';
import { useState,useEffect } from 'react';

const ShowProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch('http://localhost:9898/api/products')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => setProducts(data))
        .catch((error) => {
          console.error('Fetch error:', error);
          setProducts([]);
        });
    }, []);
  
    return (
      <div>
        {products.length ? (
          <ProductList products={products} />
        ) : (
          <div>No products found</div>
        )}
      </div>
    );
}

export default ShowProducts
