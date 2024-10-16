import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const ShowProduct = ({ product }) => {
  
  const { setCart, cart ,token,backend_url,addCart} = useContext(ShopContext);
  const [size, setSize] = useState("");
  return (
    <>
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              product.image.map((item, index) => (
                <img key={index}
                  src={product.image[index]}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  alt=""
                />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              src={product.image[0]}
              className="w-full h-auto"
              alt=""
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {
              product.image.map((item, index) => (
                <img key={index}
                  src={product.image[index]}
                  alt=""
                  className="w-3 5"
                />
              ))
            }

            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">${product.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {product.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              <button
                onClick={() => setSize("S")}
                className={`border py-2 px-4 ${size === "S" ? "border-orange-500 bg-gray-100" : "bg-gray-100 "}`}
              >
                S
              </button>
              <button
                onClick={() => setSize("M")}
                className={`border py-2 px-4 ${size === "M" ?  "border-orange-500 bg-gray-100" : "bg-gray-100 "}`}
              >
                M
              </button>
              <button
                onClick={() => setSize("L")}
                className={`border py-2 px-4 ${size === "L" ?  "border-orange-500 bg-gray-100" : "bg-gray-100 "}`}
              >
                L
              </button>
              <button
                onClick={() => setSize("XL")}
                className={`border py-2 px-4 ${size === "XL" ?  "border-orange-500 bg-gray-100" : "bg-gray-100 "}`}
              >
                XL
              </button>
              <button
                onClick={() => setSize("XXL")}
                className={`border py-2 px-4 ${size === "XXL" ?  "border-orange-500 bg-gray-100" : "bg-gray-100 "}`}
              >
                XXL
              </button>

            </div>
          </div>
          <button onClick={() => { addCart(size,product) }} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (786)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
          </p>
        </div>
      </div>

    </>


  )
}

export default ShowProduct


















































/** 
  const { setCart, cart ,token,backend_url} = useContext(ShopContext);
  let cartData;
  const [size, setSize] = useState("");
  const addProduct = async() => {
    if(!size){
      toast.error("Please select size");
      return;
    }
    const isAvailable = cart.find(item => item._id === product._id && item.size === size);
    console.log(isAvailable)
   
    if (isAvailable) {
      cartData={...product,size:size,quantity:2}
        // setCart(prev => (
        //     prev.map(item => item._id === product._id && item.size === size
        //             ? { ...item, quantity: item.quantity + 1 } 
        //             : item
        //     )
        // ));

    } else {
        // setCart(prev => ([
        //     ...prev,
        //     { ...product, size: size, quantity: 1 }
        // ]));
      cartData={...product,size:size,quantity:1};
    } */