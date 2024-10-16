import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Login = () => {
  const backend_url=import.meta.env.VITE_BACKED_URL;
  console.log(backend_url)
  const [data, setData] = useState({
    email: "captainnik@gmail.com",
    password: "captainnik@955414"
  });

  const [adminToken,setAdminToken]=useState("");
  const data_hander = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const submit_handler=async(event)=>{
    event.preventDefault();
    try {
      const response=await axios.post(backend_url+"/api/user/adminLogin",data);
      if(response.data.success){
        toast.success("Login successfully");
        localStorage.setItem("adminToken",response.data.token);
        navigate("/");
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Error occured")
    }
   console.log(data)
  }
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={submit_handler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              required
              value={data.email}
              onChange={data_hander}
            // defaultValue="admin@example.com"
            name='email'
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter your password"
              required
              // defaultValue="greatstack123"
              value={data.password}
              onChange={data_hander}
              name='password'
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
            // type="submit"
          // onClick={()=>{navigate("/")}}
          >
            Login
          </button>
        </form>
      </div>
    </div>

  )
}

export default Login