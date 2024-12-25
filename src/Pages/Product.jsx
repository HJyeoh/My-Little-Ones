import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrum/Breadcrum';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  // Ensure product is found, otherwise show a fallback UI
  const product = all_product.find((e) => e.id === Number(productId));

  if (!product) {
    return <div>Product not found</div>;  // Fallback if product not found
  }

  return (
    <div>
      <Breadcrum product={product} />
      
    </div>
  );
};

export default Product;
