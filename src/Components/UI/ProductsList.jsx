import React from 'react'
import ProductCart from './ProductCart'
import ProductDetails from '../../Pages/ProductDetails/ProductDetails';
import useGetData from '../../custom-hook/useGetData';

const ProductsList = () => {
  const { data: productsData } = useGetData('products');
  return (<>
  {
    productsData?.map((item, index) => (
        <ProductCart item={item} key={index} />
    ))
  }
  </>
  );
}

export default ProductsList