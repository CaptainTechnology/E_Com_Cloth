import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = () => {
  const {backend_url}=useContext(ShopContext)
  const navigate=useNavigate();
  const {setToken}=useContext(ShopContext);
  console.log(backend_url)
  const [state, setState] = useState("Login");
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  })
  const form_handler=(e)=>{
    const {name,value}=e.target;
    setData(prev=>({
      ...prev,
      [name]:value
    }))
  }
  const submit_handler=async(event)=>{
    event.preventDefault();
    console.log(state)
    let url=backend_url+"/api/user";
    try{
      if(state==="signUp"){
        url=url+"/register"
      }else{
        url=url+"/login"
      }
      const user_data=await axios.post(url,data);
      if(user_data.data.success){
        const token=user_data.data.token;
        setToken(token)
        localStorage.setItem("token",token);
        navigate("/");
      }else{
        toast.error(user_data.data.message);
      }
    }catch(erro){
      toast.error("server is down!");
    }
  }
  return (
    <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800" onSubmit={submit_handler}>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        {
          state === "signUp"
            ?
            <p className="prata-regular text-3xl">Sign Up</p>
            : <p className="prata-regular text-3xl">Login</p>
        }
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {
        state === "signUp"
          ? <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            name='name'
            value={data.name}
            onChange={form_handler}
            required
          />
          : null
      }

      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        name='email'
        value={data.email}
        onChange={form_handler}
        required
      />
      <input type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        name='password'
        value={data.password}
        onChange={form_handler}
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {state === "signUp"
          ? <p className="cursor-pointer" onClick={() => { setState("Login") }}>Login Here</p>
          : <p className="cursor-pointer" onClick={() => { setState("signUp") }}>Create Account</p>
        }
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {state === "signUp"
          ? "Sign Up"
          : "Login"
        }
      </button>
    </form>

  )
}

export default Login