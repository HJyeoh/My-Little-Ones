import React from 'react';
import './RelatedProducts.css';
import data_product from '../Assets/products';
import Item from '../Item/Item';

const RelatedProducts = ({ category }) => {
    const relatedProducts = data_product
    .filter(item => item.category === category) // Filter by category
    .sort(() => Math.random() - 0.5) // Shuffle randomly
    .slice(0, 4); // Select first 4 products


  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map(item => (
          <Item 
            key={item.id} 
            id={item.id} 
            name={item.name} 
            image={item.photo} 
            price={item.price} 
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
