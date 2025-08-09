import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';

const ProductPage = () => {
  const { id } = useParams();
  
  return (
    <div>
      <ProductDetail id={id} />
    </div>
  );
};

export default ProductPage;