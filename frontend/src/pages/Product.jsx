import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../assets/assets';
import ShowProduct from '../components/ShowProduct';
import Related from '../components/Related';

const Product = () => {
  const params = useParams();
  const [currentP, setCurrentP] = useState(null); // Use null for initial state

  useEffect(() => {
    const product = products.find(item => item._id === params.productId); // Use find instead of filter
    setCurrentP(product);
  }, [params.productId]); // Add params.productId as a dependency

  if (!currentP) {
    return ; // Show loading state while fetching
  }

  return (
    <div>
      <ShowProduct product={currentP}/>
      <Related product={currentP}/>
    </div>
  );
};

export default Product;
