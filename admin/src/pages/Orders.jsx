import React from 'react'
import { assets } from '../assets/assets'

const Orders = () => {
  return (
    <div>
    <h3>Order Page</h3>
    <div>
    <div class="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"><img class="w-12" src={assets.parcel_icon} /><div><div></div><p class="mt-3 mb-2 font-medium">Mohit Mahmud</p><div><p>oxygen,</p><p>Chittagong, 211, Bangladesh, 253200</p></div></div><div><p class="text-sm sm:text-[15px]">Items : 0</p><p class="mt-3">Method : COD</p><p>Payment : Pending</p><p>Date : 10/3/2024</p></div><p class="text-sm sm:text-[15px]">$10</p><select class="p-2 font-semibold"><option value="Order Placed">Order Placed</option><option value="Packing">Packing</option><option value="Shipped">Shipped</option><option value="Out for delivery">Out for delivery</option><option value="Delivered">Delivered</option></select></div>
    </div>
  </div>
  )
}

export default Orders