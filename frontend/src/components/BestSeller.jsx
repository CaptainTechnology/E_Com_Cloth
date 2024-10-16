import React, { useContext, useEffect, useState } from 'react'
import AppContex, { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    useEffect(() => {
        const bestProduct = products.filter(item => item.bestseller);
        setBestSeller(bestProduct)
    }, [])
    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <div className="inline-flex gap-2 items-center mb-3">
                    <p className="text-gray-500">BEST <span className="text-gray-700 font-medium">SELLERS</span></p>
                    <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    bestSeller.slice(0, 5).map((item, index) => (
                        <Link className="text-gray-700 cursor-pointer" to={`/product/${item._id}`} key={index}>
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

export default BestSeller