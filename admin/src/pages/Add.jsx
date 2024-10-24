import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';



const Add = () => {

  const backend_url=import.meta.env.VITE_BACKED_URL;
  const [size,setSize]=useState({
    S:false,
    M:false,
    L:false,
    XL:false,
    XXL:false,
  })
  const [data,setData]=useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subcategory: "Topwear",
    date: "",
    bestseller: false
  })

  const [images,setImages]=useState({
    image1:undefined,
    image2:undefined,
    image3:undefined,
    image4:undefined,
  });

  const image_hanlder=(e)=>{
    const {name,value}=e.target;
    setImages(prev=>({
      ...prev,
      [name]:e.target.files[0]
    }))
  }
  const size_handler=(sz)=>{
    console.log(sz)
      setSize(prev=>({
        ...prev,
        [sz]: prev[sz] === true ? false: true
      }))
  }

  const form_handler=(e)=>{
    const {name,value}=e.target;
    if(name==="bestseller"){
      setData(prev=>({
        ...prev,
        [name]:e.target.checked
      }))
      return;
    }

    setData(prev=>({
      ...prev,
      [name]:value
    }))
  }
  
  const submit_handler = async (event) => {
    event.preventDefault();
    
    const sizes = Object.keys(size).filter(key => size[key] === true);
    if (sizes.length <= 0) {
        toast.warning("Select size");
        return;
    }

    try {
        const form_data = new FormData();
        form_data.append("name", data.name);
        form_data.append("description", data.description);
        form_data.append("category", data.category);
        form_data.append("subCategory", data.subcategory);
        form_data.append("sizes", JSON.stringify(sizes)); // Serialize sizes
        form_data.append("bestseller", data.bestseller);
        form_data.append("price",data.price)
        form_data.append("image1", images.image1);
        form_data.append("image2", images.image2);
        form_data.append("image3", images.image3);
        form_data.append("image4", images.image4);
      
        const response = await axios.post(backend_url+"/api/product/add", form_data, {
            headers: {
                'Content-Type': 'multipart/form-data' // Ensure the correct content type is set
            }
        });

        if (response.data.success) {
            toast.success("Product Added")
        }else{
          toast.warning(response.data.message)
        }

    } catch (error) {
        toast.error("Error occured")
    }
};


  return (
    <form className="flex flex-col w-full items-start gap-3" onSubmit={submit_handler}>
   <div>
    <p className="mb-2">Upload Image</p>
    <div className="flex gap-2">
      <label htmlFor="image1">
        <img className="w-20" src={`${images.image1?URL.createObjectURL(images.image1):assets.upload_area}`} alt="" />
        <input type="file" id="image1" hidden name='image1' onChange={image_hanlder}/>
      </label>
      <label htmlFor="image2">
        <img className="w-20" src={`${images.image2?URL.createObjectURL(images.image2):assets.upload_area}`} alt="" />
        <input type="file" id="image2" hidden name='image2' onChange={image_hanlder}/>
      </label>
      <label htmlFor="image3">
      <img className="w-20" src={`${images.image3?URL.createObjectURL(images.image3):assets.upload_area}`} alt="" />
        <input type="file" id="image3" hidden name='image3' onChange={image_hanlder}/>
      </label>
      <label htmlFor="image4">
        <img className="w-20" src={`${images.image4?URL.createObjectURL(images.image4):assets.upload_area}`} alt="" />
        <input type="file" id="image4" hidden name='image4' onChange={image_hanlder}/>
      </label>
    </div>
  </div>
  <div className="w-full">
    <p className="mb-2">Product name</p>
    <input className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Type here" required name='name' value={data.name} onChange={form_handler}/>
  </div>
  <div className="w-full">
    <p className="mb-2">Product description</p>
    <textarea className="w-full max-w-[500px] px-3 py-2" placeholder="Write content here" required name='description' onChange={form_handler} value={data.description}></textarea>
  </div>
  <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
    <div>
      <p className="mb-2">Product category</p>
      <select className="w-full px-3 py-2" name='category' value={data.category} onChange={form_handler}>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
      </select>
    </div>
    <div>
      <p className="mb-2" >Sub category</p>
      <select className="w-full px-3 py-2" name='subcategory' onChange={form_handler} value={data.subcategory}>
        <option value="Topwear">Topwear</option>
        <option value="Bottomwear">Bottomwear</option>
        <option value="Winterwear">Winterwear</option>
      </select>
    </div>
    <div>
      <p className="mb-2">Product Price</p>
      <input className="w-full px-3 py-2 sm:w-[120px]" type="number" required placeholder="25" name='price' value={data.price} onChange={form_handler}/>
    </div>
  </div>
  <div>
    <p className="mb-2">Product Sizes</p>
    <div className="flex gap-3">
      <div>
        <p className={`${size.S?"bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`} onClick={()=>size_handler("S")}>S</p>
      </div>
      <div>
        <p className={`${size.M?"bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`} onClick={()=>size_handler("M")}>M</p>
      </div>
      <div>
        <p className={`${size.L?"bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`} onClick={()=>size_handler("L")}>L</p>
      </div>
      <div>
        <p className={`${size.XL?"bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`} onClick={()=>size_handler("XL")}>XL</p>
      </div>
      <div>
        <p className={`${size.XXL?"bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`} onClick={()=>size_handler("XXL")}>XXL</p>
      </div>
    </div>
  </div>
  <div className="flex gap-2 mt-2">
    <input type="checkbox" id="bestseller" name='bestseller' onChange={form_handler} />
    <label className="cursor-pointer" htmlFor="bestseller" >Add to bestseller</label>
  </div>
  <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">ADD</button>
</form>

  )
}

export default Add