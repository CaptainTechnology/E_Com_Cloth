import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowProduct from '../components/ShowProduct';
import Related from '../components/Related';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const params = useParams();
  const { products,currency } = useContext(ShopContext);
  const [currentP, setCurrentP] = useState(null);
  const [cIndex,setCIndex]=useState(0);

  useEffect(() => {
    if (products.length > 0) {
      const product = products.find(item => item._id === params.productId);
      setCurrentP(product);
      setCIndex(0);
    }
  }, [params.productId, products]); // Add products as a dependency

  if (!currentP) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div>
      <ShowProduct product={currentP} cIndex={cIndex} setCIndex={setCIndex} />
      <Related product={currentP} />
    </div>
  );
};

export default Product;




































// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import ShowProduct from '../components/ShowProduct';
// import Related from '../components/Related';
// import { ShopContext } from '../context/ShopContext';

// const Product = () => {
//   const params = useParams();
//   const {products}=useContext(ShopContext);
//   const [currentP, setCurrentP] = useState(null); // Use null for initial state
//   useEffect(() => {
//     const product = products.find(item => item._id === params.productId); // Use find instead of filter
//     setCurrentP(product);
//   }, [params.productId]); // Add params.productId as a dependency

 
//   if (!currentP) {
//     return ; // Show loading state while fetching
//   }

//   return (
//     <div>
//       <ShowProduct product={currentP}/>
//       <Related product={currentP}/>
//     </div>
//   );
// };

// export default Product;

