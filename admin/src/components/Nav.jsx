import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
    const navigate=useNavigate();
    return (
        <div className="flex items-center py-2 px-[4%] justify-between sticky top-0 left-0 w-full bg-white shadow-md z-10">
            <img className="w-[max(10%,80px)]" src={assets.logo} alt="" />
            <button onClick={()=>{navigate("/login");localStorage.removeItem("adminToken");}} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">
                Logout
            </button>
        </div>

    )
}

export default Nav