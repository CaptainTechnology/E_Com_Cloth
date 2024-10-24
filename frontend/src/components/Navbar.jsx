import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const {cart,tempCart}=useContext(ShopContext);
    const {token,setToken}=useContext(ShopContext);
    const {setSearch}=useContext(ShopContext);
    const navigate=useNavigate();
    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [visible]);
    
    
    return (
        <div className={`flex items-center justify-between py-3 font-medium ${visible?"":"sticky"}  top-0 bg-white z-10`}>
            <Link to='/' onClick={()=>{scroll(0,0)}}>
                <img src={assets.logo} className="w-36" alt="" />
            </Link>
            <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
                <NavLink className="flex flex-col items-center gap-1" to="/" aria-current="page" onClick={()=>{scroll(0,0)}}>
                    <p>HOME</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink className="flex flex-col items-center gap-1" to="/collection" onClick={()=>{scroll(0,0)}}>
                    <p>COLLECTION</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink className="flex flex-col items-center gap-1" to="/about" onClick={()=>{scroll(0,0)}}>
                    <p>ABOUT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink className="flex flex-col items-center gap-1" to="/contact" onClick={()=>{scroll(0,0)}}>
                    <p>CONTACT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to="https://m-fashion-admin.vercel.app/" target="_blank" className="border px-5 text-xs py-1 rounded-full -mt-2">
                <p className="mt-1">Admin</p>
                </NavLink>
            </ul>
            <div className="flex items-center gap-6">
                <img src={assets.search_icon} className="w-5 cursor-pointer" alt="" onClick={()=>{
                    setSearch(true);
                    navigate("/collection");
                    scroll(0,0)
                }}/>
                <div className="group relative">
                    <img className="w-5 cursor-pointer" src={assets.profile_icon} alt="" onClick={()=>{!token?navigate("/login"):"";scroll(0,0)}}/>
                    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                        <div className={`flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded ${!token?"hidden":""}`}>
                            <p className="cursor-pointer hover:text-black" onClick={()=>{navigate("/order")}}> <img className='mr-2 w-5 inline' src={assets.orders}/>Orders</p>
                            <p className="cursor-pointer hover:text-black inline" onClick={()=>{navigate("/login");setToken("");localStorage.removeItem("token")}}><img className='mr-2 w-5 inline' src={assets.logout}/>Logout</p>
                        </div>
                    </div>
                </div>
                <Link className="relative" to="/cart" onClick={()=>{scroll(0,0)}}>
                    <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{token?cart.length:tempCart.length}</p>
                </Link>
                <img src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' onClick={()=>{setVisible(true);scroll(0,0)}} />
            </div>
            {/* sice bar */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible?"w-full h-full":"w-0 h-0"}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={()=>{setVisible(false)}} className="flex items-center gap-4 p-3 cursor-pointer">
                        <img
                            className="h-4 rotate-180"
                            src={assets.dropdown_icon}
                            alt=""
                        />
                        <p  >Back</p>
                    </div>
                    <NavLink onClick={()=>{setVisible(false);scroll(0,0)}}  className="py-2 pl-6 border" to="/">HOME</NavLink>
                    <NavLink onClick={()=>{setVisible(false);scroll(0,0)}} className="py-2 pl-6 border" to="/collection">COLLECTION</NavLink>
                    <NavLink onClick={()=>{setVisible(false);scroll(0,0)}} className="py-2 pl-6 border" to="/about">ABOUT</NavLink>
                    <NavLink onClick={()=>{setVisible(false);scroll(0,0)}} className="py-2 pl-6 border" to="/contact">CONTACT</NavLink>
                    <NavLink onClick={()=>{setVisible(false);scroll(0,0)}} className="py-2 pl-6 border" to="https://m-fashion-admin.vercel.app/" target="_blank">Admin</NavLink>
                </div>
            </div>

        </div>

    )
}

export default Navbar