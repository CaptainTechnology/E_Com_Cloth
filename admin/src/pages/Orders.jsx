import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { act } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const backend_url=import.meta.env.VITE_BACKED_URL;
  const fetch_order = async () => {
    try {
      const response = await axios.get(backend_url+'/api/order/getAdmin', {});
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error " + error);
    }
  };

  const update_order=async(orderId,status)=>{
    try {
      const response=await axios.post(backend_url+"/api/order/update",{orderId:orderId,status:status});
      if(response.data.success){
        fetch_order();
      }else{
        console.log(response.data.message);
      }

    } catch (error) {
      console.log("error occurd"+error)
    }
  }
  useEffect(() => {
    fetch_order();
  }, []);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders && orders.map((order,index)=>(
            <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
            <img className="w-12" src={assets.parcel_icon} />
            <div>
              <div>
                {order && order.items.map((item,index)=>(
                    <p className="py-0.5" key={index}> {item.name} <span> {item.size} </span> ,</p>
                  ))
                }
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName} {order.address.lastName}</p>
              <div>
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.state}, {order.address.zipCode}</p>
              </div>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
              <p className="mt-3">Method : {order.payment}</p>
              <p>Payment : {order.status==="Delivered"?"Done":"Pending"}</p>
              <p>Date : {order.date}</p>
            </div>
            <p className="text-sm sm:text-[15px]">${order.ammount}</p>
            <select className="p-2 font-semibold" value={order.status} onChange={(e)=>{update_order(order._id,e.target.value)}}>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          ))
        }
       

      </div>
    </div>
  );
};

export default Orders;
