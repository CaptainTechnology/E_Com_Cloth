import React, { useEffect, useState } from 'react'
import { products } from '../assets/assets';
import { Link } from 'react-router-dom';

const Related = ({ product }) => {
  const [related, setRelated] = useState([]);
  
  useEffect(() => {
    const pro = products.filter((item => item.category == product.category && item.subCategory === product.subCategory));
    setRelated(pro);
  }, [])
  if(!related){
    return;
  }
  return (
    <div className="my-10">
            <div className="text-center text-3xl py-8">
                <div className="inline-flex gap-2 items-center mb-3">
                    <p className="text-gray-500">RELATED <span className="text-gray-700 font-medium">PRODUCTS</span></p>
                    <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                   There are realted product feel free and checout you can refund the products
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    related.slice(0, 5).map((item, index) => (
                        <Link className="text-gray-700 cursor-pointer" onClick={scroll(0,0)} to={`/product/${item._id}`} key={index}>
                            <div className="overflow-hidden">
                                <img className="hover:scale-110 transition ease-in-out" src={item.image[0]} alt="" />
                            </div>
                            <p className="pt-3 pb-1 text-sm">{item.name}</p>
                            <p className="text-sm font-medium">${item.price}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
  )
}

export default Related