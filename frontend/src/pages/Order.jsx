import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../../admin/src/assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';

const Order = () => {
  const { orders, backend_url } = useContext(ShopContext);
  useEffect(()=>{
    
  },[])
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">
            MY <span className="text-gray-700 font-medium">ORDERS</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>
      <div>
        {orders && [...orders].reverse().map((order, index) => (
          <div key={index}>
            {order.data && order.data.map((item, index) => (
              <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-6 text-sm">
                  <img
                    className="w-16 sm:w-20"
                    src={`${backend_url}/api/product/images${item.image[0]}`}
                    alt=""
                  />
                  <div>
                    <p className="sm:text-base font-medium">{item.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                      <p>${item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className="mt-1">Date: <span className="text-gray-400">{order.userInfo.date}</span></p>
                    <p className="mt-1">Payment: <span className="text-gray-400">{order.userInfo.payment}</span></p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">Order Placed</p>
                  </div>
                  <button className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
                </div>
              </div>
            ))}
          </div>
        ))
        }
      </div>

    </div>

  )
}

export default Order