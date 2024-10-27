import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const List = () => {
  const [products, setProducts] = useState([]);
  const [trigger,setTrigger]=useState(false);
  const backend_url = import.meta.env.VITE_BACKED_URL;
  console.log(backend_url)
  const fetch_data = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/get", {});
      setProducts(response.data.data);
      setTrigger(true)
    } catch (error) {
      toast.error("Error occured")
    }
  }

  const delete_product=async(product_id)=>{
    try {
      const response=await axios.post(backend_url+"/api/product/remove",{product_id});
      if(response.data.success){
        toast.success(response.data.message)
        fetch_data();
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("error occured")
    }
  }
  useEffect(() => {
    fetch_data();
  }, [])
  useEffect(() => {
    if(trigger){
      setTrigger(false);
    }
  }, [trigger])
 
  return (
    <div>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
      </div>

      {
        products.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm mt-2">
            <img className="w-12" src={item.image[0]}  />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <img src={assets.del} className="text-right md:text-center cursor-pointer text-lg w-5" onClick={()=>{index>52?delete_product(item._id):toast.error("Admin product can't be deleted")}}/>
          </div>
        ))
      }
    </div>
  )
}

export default List