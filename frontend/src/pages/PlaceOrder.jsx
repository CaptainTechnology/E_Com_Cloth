import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const navigate=useNavigate();
  const {cart,setOrders,backend_url,token,remove_cart,fetch_order}=useContext(ShopContext);
  function getDate() {
    const date = new Date(new Date());
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = days[date.getUTCDay()];
    const monthName = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    return `${dayName} ${monthName} ${day} ${year}`;
}
  const [user,setUser]=useState({
    firstName:"captain",
    lastName:"jack",
    email:"captain@gmail.com",
    street:"vakhanpada",
    city:"nalasupara",
    state:"maharastra",
    zipCode:"401209",
    country:"India",
    phone:"786786678",
  })
  const data_handler=(e)=>{
    const {name,value}=e.target;
    setUser(prev=>({
      ...prev,
      [name]:value
    }))
  }

  const submit_handler=async(event)=>{
    event.preventDefault();
    if(cart.length<=0){
      toast.warning("Cart is empty");
      return;
    }
    const date=getDate();
    const new_order={data:cart,userInfo:{user,date,payment:"COD"}}
    setOrders(new_order)
    try {
      const respone=await axios.post(backend_url+"/api/order/add",{order:new_order},{headers:{token}});
      if(respone.data.success){
        console.log("Added to order");
        await remove_cart();
        await  fetch_order();
        navigate("/order")
      }else{
        console.log(respone.data.message)
      }
    } catch (error) {
      console.log("ERROR"+error)
    }
  }
  return (
    <form className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t" onSubmit={submit_handler}>
  <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
    <div className="text-xl sm:text-2xl my-3">
      <div className="inline-flex gap-2 items-center mb-3">
        <p className="text-gray-500">DELIVERY <span className="text-gray-700 font-medium">INFORMATION</span></p>
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
      </div>
    </div>
    <div className="flex gap-3">
      <input required name="firstName" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name" onChange={data_handler} value={user.firstName}/>
      <input required name="lastName" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" onChange={data_handler} value={user.lastName}/>
    </div>
    <input required name="email" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" onChange={data_handler} value={user.email}/>
    <input required name="street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" onChange={data_handler} value={user.street}/>
    <div className="flex gap-3">
      <input required name="city" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" onChange={data_handler} value={user.city}/>
      <input name="state" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" onChange={data_handler} value={user.state} />
    </div>
    <div className="flex gap-3">
      <input required name="zipCode" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" onChange={data_handler} value={user.zipCode}/>
      <input required name="country" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" onChange={data_handler} value={user.country}/>
    </div>
    <input required name="phone" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" onChange={data_handler} value={user.phone} />
  </div>
  
  <div className="mt-8">
    <div className="mt-8 min-w-80">
      <div className="w-full">
        <div className="text-2xl">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">CART <span className="text-gray-700 font-medium">TOTALS</span></p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2 text-sm">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>$ 76.00</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>$ 10.00</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <b>Total</b>
            <b>$ 86.00</b>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-12">
      <div className="inline-flex gap-2 items-center mb-3">
        <p className="text-gray-500">PAYMENT <span className="text-gray-700 font-medium">METHOD</span></p>
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
      </div>
      <div className="flex gap-3 flex-col lg:flex-row">
        <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
          <p className="min-w-3.5 h-3.5 border rounded-full"></p>
          <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
        </div>
        <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
          <p className="min-w-3.5 h-3.5 border rounded-full"></p>
          <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
        </div>
        <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
          <p className="min-w-3.5 h-3.5 border rounded-full bg-green-400"></p>
          <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
        </div>
      </div>
      <div className="w-full text-end mt-8">
        <button type="submit" className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
      </div>
    </div>
  </div>
</form>

  )
}

export default PlaceOrder