import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const Latest = () => {
  const {products}=useContext(ShopContext)

  return (
    <div className="my-10">
  <div className="text-center py-8 text-3xl">
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500">LATEST <span className="text-gray-700 font-medium">COLLECTIONS</span></p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
    </div>
    <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
      Latest Products are avaiblable here please feel confortable and book the products.
    </p>
  </div>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
    {
      products.slice(0,10).map((item,index)=>{
        return (
          <Link className="text-gray-700 cursor-pointer" to={`product/${item._id}`} key={index}>
          <div className="overflow-hidden">
            <img className="hover:scale-110 transition ease-in-out" src={item.image[0]} alt="" />
          </div>
          <p className="pt-3 pb-1 text-sm">{item.name}</p>
          <p className="text-sm font-medium">${item.price}</p>
        </Link>
        )
      })
    }
  </div>
</div>

  )
}

export default Latest