import React, { useState } from 'react';
import ProductCart from '../../Components/UI/ProductCart';
import ProductDetails from '../../Pages/ProductDetails/ProductDetails';


const products = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductSelect = (productId) => {
    setSelectedProductId(productId);
  };

  return (
    <div>
      {/* Render the ProductCart component and pass the handleProductSelect function */}
      <ProductCart onSelectProduct={handleProductSelect} />

      {/* Render the ProductDetails component and pass the selectedProductId as a prop */}
      <ProductDetails selectedProductId={selectedProductId} />
    </div>
  );
};

export default products;
